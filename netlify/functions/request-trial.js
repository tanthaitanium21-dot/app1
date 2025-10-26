// ไฟล์: netlify/functions/request-trial.js (โค้ดที่ถูกต้องและสมบูรณ์)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const userIp = event.headers['x-nf-client-connection-ip'] || 'unknown';

  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // 1. ตรวจสอบว่า IP นี้เคยขอทดลองใช้ใน 24 ชั่วโมงที่ผ่านมาหรือไม่
    const { data, error: selectError } = await supabase
      .from('trial_logs')
      .select('id')
      .eq('ip_address', userIp)
      .gte('created_at', twentyFourHoursAgo)
      .single();
    
    // จัดการ Error เมื่อไม่พบข้อมูล ซึ่งถือว่าปกติ
    if (selectError && selectError.code !== 'PGRST116') {
       throw new Error(`Supabase select error: ${selectError.message}`);
    }

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
      throw new Error(`Supabase insert error: ${insertError.message}`);
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
    // ส่งรายละเอียดข้อผิดพลาดกลับไป (เผื่อมีปัญหาอื่น)
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An internal server error occurred.',
        error_details: err.message
      })
    };
  }
};
