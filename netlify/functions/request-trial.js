// ไฟล์: netlify/functions/request-trial.js (เฉพาะส่วนที่ต้องแก้ไข)
// ... (โค้ดส่วน try) ...

  } catch (err) {
    // --- ส่งรายละเอียดข้อผิดพลาดที่แท้จริงกลับไป ---
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: 'An error occurred in the system.',
        error_details: err.message
      }) // <<--- วงเล็บปีกกาและวงเล็บปิดของ JSON.stringify
    }; // <<--- วงเล็บปีกกาและวงเล็บปิดของ Object ที่ return
  }
}; // <<--- วงเล็บปิดของ function handler
