//... (โค้ดส่วนบนเหมือนเดิม) ...

//... (ตรงส่วนนี้คือโลจิกการเชื่อมต่อ Supabase) ...

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


