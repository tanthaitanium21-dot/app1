// File: netlify/functions/request-trial.js

import { createClient } from '@supabase/supabase-js';

// กำหนดเวลาทดลองใช้: 1 วัน (24 ชั่วโมง)
const TRIAL_DURATION_MS = 24 * 60 * 60 * 1000;

export default async function handler(event) {
    // 1. ตรวจสอบเมธอดของคำขอ
    if (event.httpMethod!== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
        };
    }

    try {
        // 2. ตรวจสอบตัวแปรสภาพแวดล้อม (Environment Variables)
        const supabaseUrl = process.env.SUPABASE_URL;
        // ใช้ SERVICE_ROLE_KEY ใน Backend/Function เพื่อความปลอดภัยและสิทธิ์การเข้าถึงเต็มรูปแบบ
        const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

        if (!supabaseUrl ||!serviceRoleKey) {
            console.error('SUPABASE_URL or SERVICE_ROLE_KEY is missing.');
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: 'Server configuration error (missing keys).' })
            };
        }

        // 3. เริ่มต้น Supabase Client ด้วย Service Role Key (Admin Client)
        const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);
        
        // เราสมมติว่าคุณส่งข้อมูลผู้ใช้ (เช่น IP หรือ ID เซสชัน) มาใน Body
        const { userId = 'anonymous_trial' } = JSON.parse(event.body);

        // 4. คำนวณวันหมดอายุ (24 ชั่วโมงจากตอนนี้)
        const expiresAt = new Date(Date.now() + TRIAL_DURATION_MS);
        const expiresAtISO = expiresAt.toISOString();

        // 5. บันทึก/อัปเดตสถานะในฐานข้อมูล Supabase 
        // (สมมติว่าคุณมีตารางชื่อ 'trial_users' สำหรับการจัดการสิทธิ์)
        const { data, error } = await supabaseAdmin
           .from('trial_users')
           .upsert(
                {
                    user_identifier: userId, // หรือใช้ Netlify Identity ID หากมี
                    trial_granted_at: new Date().toISOString(),
                    expires_at: expiresAtISO
                },
                { onConflict: 'user_identifier' }
            )
           .select();

        if (error) {
            console.error('Supabase Error:', error);
            // ข้อผิดพลาดที่นี่อาจเกิดจาก Regional Mismatch (Layer 4)
            // หรือปัญหา RLS/Permissions (แม้จะใช้ Service Role Key ก็ตาม)
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: `Database operation failed: ${error.message}` })
            };
        }

        // 6. ส่งผลลัพธ์ที่สำเร็จกลับไปยัง Frontend
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                // *สำคัญ:* หากคุณกำลังใช้ Edge Functions, คุณอาจต้องเพิ่มส่วนหัว CORS
                // แต่สำหรับ Netlify Functions, ปกติ Netlify จะจัดการส่วนหัวพื้นฐานให้
            },
            body: JSON.stringify({
                success: true,
                expires_at: expiresAtISO,
                message: 'Trial access granted for 24 hours.'
            })
        };

    } catch (e) {
        console.error('General Function Error:', e);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Internal server error during trial request.' })
        };
    }
}
