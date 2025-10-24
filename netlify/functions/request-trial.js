// ไฟล์: netlify/functions/request-trial.js
import { createClient } from '@supabase/supabase-js';

// ดึงค่าจาก Environment Variables ที่เราจะตั้งค่าใน Netlify
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // ดึง IP Address ของผู้ใช้
  const userIp = event.headers['x-nf-client-connection-ip'] || 'unknown';

  try {
    // 1. ตรวจสอบว่า IP นี้เคยขอทดลองใช้ใน 24 ชั่วโมงที่ผ่านมาหรือไม่
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data, error } = await supabase
      .from('trial_logs')
      .select('id')
      .eq('ip_address', userIp)
      .gte('created_at', twentyFourHoursAgo)
      .single();

    if (data) {
      // ถ้าเจอข้อมูล แสดงว่าเคยใช้แล้ว
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, message: 'คุณได้ใช้สิทธิ์ทดลองใช้ฟรีไปแล้ว' }),
      };
    }

    // 2. ถ้ายังไม่เคยใช้ ให้บันทึก IP ลงฐานข้อมูล
    const { error: insertError } = await supabase.from('trial_logs').insert({ ip_address: userIp });
    if (insertError) {
      throw new Error('ไม่สามารถบันทึกข้อมูลการทดลองใช้ได้');
    }

    // 3. คำนวณวันหมดอายุ (ปัจจุบัน + 1 วัน) แล้วส่งกลับไป
    const now = new Date();
    const expiryDate = new Date(now.setDate(now.getDate() + 1));

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'เปิดใช้งานโหมดทดลองใช้สำเร็จ!',
        expires_at: expiryDate.toISOString(),
      }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ success: false, message: 'เกิดข้อผิดพลาดในระบบ' }) };
  }
};