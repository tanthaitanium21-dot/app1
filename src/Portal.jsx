import React from "react";

export default function Portal() {
  return (
    <div style={{ margin: 0, fontFamily: "Inter, sans-serif", background: "radial-gradient(circle at 20% 20%, #0a0f1a, #000)", color: "#d6e2ff", overflowX: "hidden" }}>
      <div style={{ position: "fixed", inset: 0, background: "url('https://i.imgur.com/4NJl9bN.png')", opacity: 0.3, zIndex: -1 }}></div>

      <header style={{ textAlign: "center", padding: "60px 20px 30px" }}>
        <h1 style={{ fontSize: "3rem", letterSpacing: "3px", background: "linear-gradient(90deg,#5bc0ff,#adf7ff)", WebkitBackgroundClip: "text", color: "transparent" }}>
          PROJECT PORTAL
        </h1>
        <p style={{ marginTop: "-10px", fontSize: "1.2rem", opacity: 0.8 }}>เลือกระบบที่คุณต้องการใช้งาน</p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "30px", padding: "40px", maxWidth: "1200px", margin: "auto" }}>
        <a href="/systems/electrical/index.html" style={cardStyle}>
          <div style={glowLine}></div>
          <h2>⚡ ระบบงานไฟฟ้า</h2>
          <p>คำนวณวงจร, BOQ, ค่าแรง, รายงานทั้งหมดในหน้าเดียว</p>
        </a>

        <a href="/systems/structure/index.html" style={cardStyle}>
          <div style={glowLine}></div>
          <h2>🏗️ ระบบโครงสร้าง</h2>
          <p>เตรียมพื้นที่เพื่อรองรับการคำนวณโครงสร้างเต็มระบบ</p>
        </a>

        <a href="#" style={cardStyle}>
          <div style={glowLine}></div>
          <h2>🚰 ระบบประปา (กำลังพัฒนา)</h2>
          <p>ระบบออกแบบและคำนวณปริมาณงานประปา</p>
        </a>
      </section>

      <section style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#73d5ff" }}>
          ⚡ ระบบคำนวณงานไฟฟ้า (ฝังในหน้านี้)
        </h2>
        <iframe
          src="/systems/electrical/index.html"
          style={{ width: "100%", height: "900px", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "20px", background: "rgba(0,0,0,0.4)" }}
        ></iframe>
      </section>

      <section style={{ maxWidth: "1200px", margin: "auto", padding: "40px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#adf7ff" }}>📦 ผลสรุป BOQ / PO จากระบบคำนวณ</h2>
        <p style={{ textAlign: "center", fontSize: "0.9rem", opacity: 0.7, marginBottom: "25px" }}>
          ข้อมูลที่ระบบไฟฟ้าส่งออกจะแสดงที่นี่แบบ Real-time
        </p>

        <div
          id="result-box"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(12px)",
            padding: "25px",
            borderRadius: "20px",
            minHeight: "200px",
            boxShadow: "0 0 20px rgba(115,213,255,0.15)",
          }}
        >
          <p style={{ opacity: 0.6, textAlign: "center" }}>⏳ รอผลลัพธ์จากระบบคำนวณ...</p>
        </div>
      </section>
    </div>
  );
}

const cardStyle = {
  background: "rgba(255,255,255,0.05)",
  padding: "25px",
  borderRadius: "20px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.1)",
  transition: "0.3s",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
};

const glowLine = {
  position: "absolute",
  top: 0,
  left: "-100%",
  width: "100%",
  height: "3px",
  background: "linear-gradient(90deg, transparent, #73d5ff, transparent)",
  animation: "slide 3s infinite",
};
