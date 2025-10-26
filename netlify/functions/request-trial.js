const { createClient } = require('@supabase/supabase-js');
const { parse } = require('url');

// โหลดตัวแปรสภาพแวดล้อม
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// ตารางที่ใช้เก็บข้อมูลการทดลองใช้
const TABLE_NAME = 'trial_access'; 
// ระยะเวลาทดลองใช้ (24 ชั่วโมง)
const TRIAL_DURATION_HOURS = 24;

// ฟังก์ชันหลักของ Netlify
exports.handler = async (event) => {
    // Netlify Functions อนุญาตเฉพาะ method: 'POST'
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }
    
    // ตรวจสอบตัวแปรสภาพแวดล้อม
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        console.error("Supabase Environment Variables are not set.");
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: "Server configuration error. Check SUPABASE_URL/ANON_KEY." }),
        };
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    let body;
    try {
        body = JSON.parse(event.body);
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: "Invalid JSON body." }),
        };
    }

    const client_id = body.client_id;
    if (!client_id) {
         return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: "Client ID is required." }),
        };
    }

    try {
        // 1. ตรวจสอบสถานะการทดลองใช้ปัจจุบันของ client_id นี้
        // ใช้ Policy SELECT
        let { data: existingTrial, error: selectError } = await supabase
            .from(TABLE_NAME)
            .select('expires_at')
            .eq('client_id', client_id)
            .single();

        if (selectError && selectError.code !== 'PGRST116') { // PGRST116 คือไม่พบข้อมูล
            console.error("Supabase Select Error:", selectError);
            return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: "Database query error during check." }),
            };
        }

        const now = new Date();
        const existingExpiry = existingTrial ? new Date(existingTrial.expires_at) : null;
        
        // 2. ถ้ามีอยู่และยังไม่หมดอายุ
        if (existingExpiry && existingExpiry.getTime() > now.getTime()) {
            return {
                statusCode: 200,
                body: JSON.stringify({ 
                    success: false, 
                    message: `คุณเคยเปิดใช้งานการทดลองใช้แล้ว และจะหมดอายุในวันที่ ${existingExpiry.toLocaleString('th-TH')}`,
                    expires_at: existingTrial.expires_at // ส่งเวลาหมดอายุเดิมกลับไป
                }),
            };
        }

        // 3. ถ้าไม่มี หรือหมดอายุแล้ว => กำหนดเวลาหมดอายุใหม่ (24 ชั่วโมงจากนี้)
        const newExpiry = new Date(now.getTime() + TRIAL_DURATION_HOURS * 60 * 60 * 1000);
        const newExpiryISO = newExpiry.toISOString();
        
        const trialData = {
            client_id: client_id,
            expires_at: newExpiryISO,
        };

        // 4. บันทึก/อัปเดต ใน Supabase (ใช้ Policy INSERT/UPDATE)
        const { error: upsertError } = await supabase
            .from(TABLE_NAME)
            .upsert([trialData], { onConflict: 'client_id' }); 

        if (upsertError) {
            console.error("Supabase Upsert Error:", upsertError);
             return {
                statusCode: 500,
                body: JSON.stringify({ success: false, message: "Database write error. Check RLS policies." }),
            };
        }

        // 5. ส่งผลลัพธ์กลับ
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                success: true, 
                message: `เปิดใช้งานการทดลองใช้ 24 ชั่วโมงแล้ว`,
                expires_at: newExpiryISO
            }),
        };

    } catch (error) {
        console.error("General Function Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: `General Server Error: ${error.message}` }),
        };
    }
};
