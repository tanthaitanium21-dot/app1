// ไฟล์: netlify/functions/request-trial.js (เวอร์ชันสำหรับดีบัก)
import { createClient } from '@supabase/supabase-js';

export const handler = async (event) => {
  // เพิ่มคอมเมนต์เล็กน้อยเพื่อบังคับให้ Netlify deploy ใหม่
  // Debug Version 1.1
  
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

  // --- ส่วนตรวจสอบตัวแปร ---
  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'Server Error: Environment variables are missing.',
        error_details: `URL Found: ${!!supabaseUrl}, Key Found: ${!!supabaseKey}`
      })
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const userIp = event.headers['x-nf-client-connection-ip'] || 'unknown';

  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data, error: selectError } = await supabase
      .from('trial_logs')
      .select('id')
      .eq('ip_address', userIp)
      .gte('created_at', twentyFourHoursAgo)
      .single();
    
    // PGRST116 คือ error "ไม่พบข้อมูล" ซึ่งในกรณีนี้คือสิ่งที่ถูกต้อง
    if (selectError && selectError.code !== 'PGRST116') {
       throw new Error(`Supabase select error: ${selectError.message}`);
    }

    if (data) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: false, message: 'คุณได้ใช้สิทธิ์ทดลองใช้ฟรีไปแล้ว' }),
      };
    }

    const { error: insertError } = await supabase.from('trial_logs').insert({ ip_address: userIp });
    
    if (insertError) {
      throw new Error(`Supabase insert error: ${insertError.message}`);
    }

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
    // --- ส่งรายละเอียดข้อผิดพลาดที่แท้จริงกลับไป ---
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An error occurred in the system.',
        error_details: err.message // นี่คือสิ่งที่เราอยากเห็น!
      })
    };
  }
};
