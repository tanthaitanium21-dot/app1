// data/electrical_data.js
// ข้อมูลงานไฟฟ้าและราคา (V2.4: ปรับท่อเป็นราคาต่อเมตร / กิ๊บจับ x3)

export const mainCableSpecs = {
    'MEA': { // กฟน.
        '5(15)': { 'THW': 10 },
        '15(45)': { 'THW': 10 },
        '30(100)': { 'THW': 25 },
        '50(150)': { 'THW': 35 }
    },
    'PEA': { // กฟภ.
        '5(15)': { 'THW': 10, 'THW-A': 16 },
        '15(45)': { 'THW': 16, 'THW-A': 25 },
        '30(100)': { 'THW': 35, 'THW-A': 50 },
        '50(150)': { 'THW': 35, 'THW-A': 50 }
    }
};

export const initialPriceList = {
    "L-11-01": 5, "L-12-01": 5, "L-13-01": 5, "L-21-01": 25, "L-22-01": 27, "L-23-01": 95,
    "L-31-01": 100, "L-32-01": 120, "L-33-01": 100, "L-41-01": 150, "L-61-01": 300,
    "L-71-01": 500, "L-71-02": 25, "L-81-01": 1500, "L-82-01": 1800, "L-83-01": 1200, "L-84-01": 100,
    "L-91-01": 500, "L-AC-INSTALL-12K": 1500, "L-AC-WIRING": 30, "L-GND-WIRING-4.0": 15,
    "L-PUMP-INSTALL": 1500, "L-FAN-INSTALL": 500, "L-LAN-POINT": 120, "L-LAN-WIRING": 15,
    "L-TV-POINT": 120, "L-TV-WIRING": 15, "L-CCTV-POINT": 450, "L-BREAKER-INSTALL": 250,
    "M-WIRE-THW-2.5-BRN": 15, "M-WIRE-THW-2.5-BLU": 15, "M-WIRE-THW-2.5-GRN": 15,
    "M-WIRE-THW-1.5-BRN": 10, "M-WIRE-THW-1.5-BLU": 10, "M-WIRE-THW-1.5-GRN": 10,
    "M-WIRE-VAF-2.5": 25, "M-CLIP-VAF": 1, 
    
    // --- ปรับราคาเป็น "ต่อเมตร" ---
    "M-CONDUIT-PVC-1/2": 20, // เดิม 58 (ต่อเส้น) -> ปรับเป็น ~20 บาท/เมตร
    "M-CONDUIT-EMT-1/2": 50, // เดิม 145 (ต่อเส้น) -> ปรับเป็น ~50 บาท/เมตร
    
    "M-SADDLE-PVC-1/2": 2, // กิ๊บก้ามปู
    "M-CONN-PVC-COUPLING": 3, 
    "M-STRAP-EMT-1/2": 3, // แคล้มป์จับท่อ
    "M-CONN-EMT-COUPLING": 10, "M-CONN-PVC-CONNECTOR": 5, "M-CONN-EMT-CONNECTOR": 8,
    "M-OUTLET-DPLX-GND": 150, "M-PLATE-2CH": 20, "M-BOX-SURFACE-2X4": 15, "M-BOX-HANDY-2X4": 25,
    "M-SWITCH-1WAY": 120, "M-PLATE-1CH": 14, "M-LIGHT-DOWNLIGHT-E27": 350, "M-LIGHT-BULB-LED-9W": 65,
    "M-GROUNDROD-2.4M": 600, "M-GROUNDCLAMP-5/8": 50, "M-WIRE-GND-10SQMM": 60, "M-LUG-10SQMM": 15,
    "M-GROUND-PIT": 250, "M-WIRE-THW-4.0-BRN": 25, "M-WIRE-THW-4.0-BLU": 25, "M-WIRE-THW-4.0-GRN": 25,
    "M-CU-4CH": 850, "M-CU-6CH": 1000, "M-CU-8CH": 1200, "M-CU-10CH": 1400, "M-CU-12CH": 1600,
    "M-CU-LABELS": 50, "M-CB-1P-16A": 120, "M-CB-1P-20A": 120, "M-CB-1P-32A": 120,
    "M-BOX-BREAKER-SURFACE-1P": 50, "M-AC-BRACKET": 450, "M-AC-PIPE-4M": 750, "M-AC-DUCT-2M": 120,
    "M-AC-DRAINPIPE-4M": 80, "M-AC-TAPE-VINYL": 50, "M-AC-PUTTY": 30, "M-AC-SCREWS-ANCHORS": 100,
    "M-PUMP-BALL-VALVE": 80, "M-PUMP-CHECK-VALVE": 150, "M-PUMP-UNION": 60, "M-TAPE-SEAL": 20,
    "M-FAN-HOOK-ANCHOR": 100, "M-WH-RCBO-32A": 750, "M-WH-HOSE-FLEX": 120, "M-WH-VALVE": 90,
    "M-SCREWS-ANCHORS-KIT": 50, "M-LAN-RJ45-OUTLET": 250, "M-LAN-CABLE-CAT6": 15,
    "M-TV-OUTLET": 150, "M-TV-CABLE-RG6": 9, "M-CCTV-CAMERA": 1200, "M-CCTV-CABLE-10M": 250,
    "M-CCTV-ADAPTER": 150, "M-CCTV-BOX-4X4": 45, "M-TAPE-ELEC": 20, "L-PVC-TRUNKING": 20,
    "M-PVC-TRUNKING-20x40": 45, "M-LIGHT-SET-LED-PANEL": 250, "M-LIGHT-SET-T8": 300,
    "L-T8-INSTALL": 200, "L-VCT-WIRING": 9, "L-NYY-WIRING": 15, "M-CABLE-VCT-2C-2.5": 30,
    "M-CABLE-NYY-2C-2.5": 35, "M-WATERPROOF-BOX": 45, "L-POLE-6.0M": 950, "L-POLE-7.0M": 1025,
    "L-POLE-8.0M": 1100, "L-POLE-9.0M": 1250, "M-POLE-6.0M": 1050, "M-POLE-7.0M": 1350,
    "M-POLE-8.0M": 1680, "M-POLE-9.0M": 2090, "L-RACK-INSTALL": 150, "M-RACK-2SET": 300,
    "M-RACK-4SET": 600, "M-RACK-1SET": 150, 
    "M-CABLE-THW-10": 45, "M-CABLE-THW-16": 75, "M-CABLE-THW-25": 110, "M-CABLE-THW-35": 150, "M-CABLE-THW-50": 200,
    "M-CABLE-THW-A-16": 20, "M-CABLE-THW-A-25": 25, "M-CABLE-THW-A-35": 35, "M-CABLE-THW-A-50": 45,
    "L-EV-INSTALL-20M": 10000, "M-EV-CHARGER-7KW": 30000, "M-RCD-TYPE-B": 4000,
    "M-CONDUIT-EMT-3/4": 120, "FEE-TOU-METER": 6500, "L-DEMO-DOWNLIGHT": 25,
    "L-DEMO-OUTLET-SWITCH": 25, "L-DEMO-PIPE": 200, "L-DEMO-AC": 1500, "L-REPAIR-WALL-POINT": 65
};

export const electricalInstallationData = [
    { "category_id": "1.0", "category_name": "งานเดินสายไฟฟ้า", "tasks": [
        { "task_id": "1.1", "task_name": "ร้อยสาย THW 2.5mm² ในท่อ (เต้ารับ)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-11-01"}], "material_components": [{"material_id": "M-WIRE-THW-2.5-BRN", "spec": "สาย THW 2.5mm² สีน้ำตาล"}, {"material_id": "M-WIRE-THW-2.5-BLU", "spec": "สาย THW 2.5mm² สีฟ้า"}, {"material_id": "M-WIRE-THW-2.5-GRN", "spec": "สาย THW 2.5mm² สีเขียว/เหลือง"}] },
        { "task_id": "1.2", "task_name": "ร้อยสาย THW 1.5mm² ในท่อ (แสงสว่าง)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-12-01"}], "material_components": [{"material_id": "M-WIRE-THW-1.5-BRN", "spec": "สาย THW 1.5mm² สีน้ำตาล"}, {"material_id": "M-WIRE-THW-1.5-BLU", "spec": "สาย THW 1.5mm² สีฟ้า"}, ] },
        { "task_id": "1.3", "task_name": "เดินสาย VAF 2x2.5mm² ตีกิ๊ป", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-13-01"}], "material_components": [{"material_id": "M-WIRE-VAF-2.5", "spec": "สาย VAF-G 2x2.5mm²"}, {"material_id": "M-CLIP-VAF", "spec": "กิ๊ปจับสาย", "usage_logic": "5 per meter"}] },
        { "task_id": "1.4", "task_name": "ร้อยสาย THW 4.0mm² ในท่อ (L,N)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-AC-WIRING"}], "material_components": [{"material_id": "M-WIRE-THW-4.0-BRN", "spec":"สาย THW 4.0mm² สีน้ำตาล"}, {"material_id": "M-WIRE-THW-4.0-BLU", "spec":"สาย THW 4.0mm² สีฟ้า"}] },
        { "task_id": "1.5", "task_name": "ร้อยสายดิน THW 4.0mm² ในท่อ (G)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-GND-WIRING-4.0"}], "material_components": [{"material_id": "M-WIRE-THW-4.0-GRN", "spec":"สาย THW 4.0mm² สีเขียว/เหลือง"}] }
    ]},
    { "category_id": "2.0", "category_name": "งานติดตั้งท่อร้อยสาย", "tasks": [
        { "task_id": "2.1", "task_name": "เดินท่อ PVC ลอย", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-21-01"}], "material_components": [
            { "material_id": "M-CONDUIT-PVC-1/2", "spec": "ท่อ PVC 1/2\" (ราคาต่อเมตร)", "usage_logic": "1 per meter" },
            { "material_id": "M-SADDLE-PVC-1/2", "spec": "กิ๊บก้ามปูจับท่อ PVC 1/2\"", "usage_logic": "3 per meter" },
            { "material_id": "M-CONN-PVC-COUPLING", "spec": "ข้อต่อตรง PVC", "usage_logic": "0.35 per meter" }
        ]},
        { "task_id": "2.2", "task_name": "เดินท่อ EMT ลอย", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-22-01"}], "material_components": [
            { "material_id": "M-CONDUIT-EMT-1/2", "spec": "ท่อ EMT 1/2\" (ราคาต่อเมตร)", "usage_logic": "1 per meter" },
            { "material_id": "M-STRAP-EMT-1/2", "spec": "แคล้มป์จับท่อ EMT 1/2\"", "usage_logic": "3 per meter" },
            { "material_id": "M-CONN-EMT-COUPLING", "spec": "ข้อต่อตรง EMT", "usage_logic": "0.35 per meter" }
        ]},
        { "task_id": "2.3", "task_name": "เดินท่อ PVC ฝังผนัง (รวมกรีด/สกัด/ฉาบปูนหยาบ)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-23-01"}], "material_components": [
            { "material_id": "M-CONDUIT-PVC-1/2", "spec": "ท่อ PVC 1/2\" (ราคาต่อเมตร)", "usage_logic": "1 per meter" },
            { "material_id": "M-CONN-PVC-COUPLING", "spec": "ข้อต่อตรง PVC", "usage_logic": "0.35 per meter" }
        ]}
    ]},
    // ... (ส่วนอื่นๆ คงเดิม) ...
    { "category_id": "3.0", "category_name": "งานติดตั้งสวิตช์-เต้ารับ", "tasks": [
        { "task_id": "3.1", "task_name": "ติดตั้งเต้ารับแบบลอย", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-31-01"}], "material_components": [{"material_id": "M-OUTLET-DPLX-GND", "spec": "เต้ารับกราวด์คู่"}, {"material_id": "M-PLATE-2CH", "spec": "หน้ากาก 2 ช่อง"}, {"material_id": "M-BOX-SURFACE-2X4", "spec": "กล่องลอย 2x4\""}, {"material_id": "M-TAPE-ELEC", "spec": "เทปพันสายไฟ"}] },
        { "task_id": "3.2", "task_name": "ติดตั้งเต้ารับแบบฝัง", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-32-01"}], "material_components": [{"material_id": "M-OUTLET-DPLX-GND", "spec": "เต้ารับกราวด์คู่"}, {"material_id": "M-PLATE-2CH", "spec": "หน้ากาก 2 ช่อง"}, {"material_id": "M-BOX-HANDY-2X4", "spec": "กล่องฝัง 2x4\""}, {"material_id": "M-TAPE-ELEC", "spec": "เทปพันสายไฟ"}] },
        { "task_id": "3.3", "task_name": "ติดตั้งสวิตช์แบบลอย", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-33-01"}], "material_components": [{"material_id": "M-SWITCH-1WAY", "spec": "สวิตช์ทางเดียว"}, {"material_id": "M-PLATE-1CH", "spec": "หน้ากาก 1 ช่อง"}, {"material_id": "M-BOX-SURFACE-2X4", "spec": "กล่องลอย 2x4\""}, {"material_id": "M-TAPE-ELEC", "spec": "เทปพันสายไฟ"}] }
    ]},
    { "category_id": "4.0", "category_name": "งานติดตั้งอุปกรณ์แสงสว่าง", "tasks": [
        { "task_id": "4.1", "task_name": "ติดตั้งโคมไฟดาวน์ไลท์ (LED E27)", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-41-01"}], "material_components": [{"material_id": "M-LIGHT-DOWNLIGHT-E27", "spec": "โคมดาวน์ไลท์ E27"}, {"material_id": "M-LIGHT-BULB-LED-9W", "spec": "หลอด LED 9W"}, {"material_id": "M-TAPE-ELEC", "spec": "เทปพันสายไฟ"}] }
    ]},
    { "category_id": "5.0", "category_name": "งานติดตั้งเครื่องใช้ไฟฟ้า", "tasks": [
        { "task_id": "5.1", "task_name": "ติดตั้งเครื่องปรับอากาศ (9-12k BTU)", "unit_of_measure": "เครื่อง", "labor_components": [{"labor_id": "L-AC-INSTALL-12K"}], "material_components": [{"material_id": "M-AC-BRACKET", "spec": "ขาแขวนคอยล์ร้อน"}, {"material_id": "M-AC-PIPE-4M", "spec": "ท่อน้ำยาสำเร็จ 4 เมตร"}, {"material_id": "M-AC-DUCT-2M", "spec": "รางครอบท่อแอร์ 2 เมตร", "usage_logic": "2 per unit"}, {"material_id": "M-AC-DRAINPIPE-4M", "spec": "ท่อน้ำทิ้ง PVC สีเทา 4 เมตร"}, {"material_id": "M-AC-TAPE-VINYL", "spec": "เทปพันท่อแอร์"}, {"material_id": "M-AC-PUTTY", "spec": "ดินน้ำมันสำหรับอุดรูท่อ"}, {"material_id": "M-AC-SCREWS-ANCHORS", "spec": "ชุดพุกและสกรูยึด"}] },
        { "task_id": "5.2", "task_name": "เดินสายไฟสำหรับเครื่องปรับอากาศ (V6: ซ่อน)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-AC-WIRING"}], "material_components": [{"material_id": "M-WIRE-THW-4.0-BRN"}, {"material_id": "M-WIRE-THW-4.0-BLU"}, {"material_id": "M-WIRE-THW-2.5-GRN"}] },
        { "task_id": "5.3", "task_name": "ติดตั้งปั๊มน้ำอัตโนมัติ", "unit_of_measure": "เครื่อง", "labor_components": [{"labor_id": "L-PUMP-INSTALL"}], "material_components": [{"material_id": "M-PUMP-BALL-VALVE", "spec": "บอลวาล์ว PVC", "usage_logic": "2 per unit"}, {"material_id": "M-PUMP-CHECK-VALVE", "spec": "เช็ควาล์วสปริง"}, {"material_id": "M-PUMP-UNION", "spec": "ข้อต่อยูเนี่ยน PVC", "usage_logic": "2 per unit"}, {"material_id": "M-TAPE-SEAL", "spec": "เทปพันเกลียว"}] },
        { "task_id": "5.4", "task_name": "ติดตั้งพัดลมเพดาน/ดูดอากาศ", "unit_of_measure": "เครื่อง", "labor_components": [{"labor_id": "L-FAN-INSTALL"}], "material_components": [{"material_id": "M-FAN-HOOK-ANCHOR", "spec": "พุก/ตะขอสำหรับยึด"}, {"material_id": "M-TAPE-ELEC", "spec": "เทปพันสายไฟ"}] }
    ]},
    { "category_id": "6.0", "category_name": "งานติดตั้งระบบสายดิน", "tasks": [
        { "task_id": "6.1", "task_name": "ตอกหลักดินและติดตั้งสายดิน", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-61-01"}], "material_components": [{"material_id": "M-GROUNDROD-2.4M", "spec": "แท่งกราวด์ 2.4ม."}, {"material_id": "M-GROUNDCLAMP-5/8", "spec": "แคล้มป์หัวใจ 5/8\""}, {"material_id": "M-LUG-10SQMM", "spec": "หางปลา 10mm²"}, {"material_id": "M-GROUND-PIT", "spec": "บ่อพักสายดิน (Ground Pit)"}] }
    ]},
    { "category_id": "7.0", "category_name": "งานติดตั้งอุปกรณ์พิเศษ", "tasks": [
        { "task_id": "7.1", "task_name": "ติดตั้งเครื่องทำน้ำอุ่น (ไม่รวมสาย)", "unit_of_measure": "เครื่อง", "labor_components": [{"labor_id": "L-71-01"}], "material_components": [{"material_id": "M-WH-RCBO-32A", "spec": "เบรกเกอร์กันดูด RCBO 32A"}, {"material_id": "M-WH-HOSE-FLEX", "spec": "สายน้ำดีถัก", "usage_logic": "2 per unit"}, {"material_id": "M-WH-VALVE", "spec": "วาล์วน้ำ"}, {"material_id": "M-TAPE-SEAL", "spec": "เทปพันเกลียว"}, {"material_id": "M-SCREWS-ANCHORS-KIT", "spec": "ชุดพุกและสกรู"}] },
        { "task_id": "7.2", "task_name": "เดินสายไฟสำหรับเครื่องทำน้ำอุ่น (V6: ซ่อน)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-71-02"}], "material_components": [{"material_id": "M-WIRE-THW-4.0-BRN", "spec": "สาย THW 4.0mm² สีน้ำตาล"}, {"material_id": "M-WIRE-THW-4.0-BLU", "spec": "สาย THW 4.0mm² สีฟ้า"}, {"material_id": "M-WIRE-THW-2.5-GRN", "spec": "สาย THW 2.5mm² สีเขียว/เหลือง"}] }
    ]},
    { "category_id": "8.0", "category_name": "งานบริการและตรวจซ่อม", "tasks": [
        { "task_id": "8.1", "task_name": "ตรวจเช็คระบบไฟฟ้าประจำปี", "unit_of_measure": "ครั้ง", "labor_components": [{"labor_id": "L-81-01"}], "material_components": [] },
        { "task_id": "8.2", "task_name": "ค้นหาจุดไฟฟ้ารั่ว", "unit_of_measure": "ครั้ง", "labor_components": [{"labor_id": "L-82-01"}], "material_components": [] },
        { "task_id": "8.3", "task_name": "ตรวจสอบสาเหตุเบรกเกอร์ทริป", "unit_of_measure": "ครั้ง", "labor_components": [{"labor_id": "L-83-01"}], "material_components": [] },
        { "task_id": "8.4", "task_name": "เปลี่ยนหลอดไฟ", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-84-01"}], "material_components": [] }
    ]},
    { "category_id": "9.0", "category_name": "งานเปลี่ยนตู้ควบคุมไฟฟ้า", "tasks": [
        { "task_id": "9.1", "task_name": "เปลี่ยนตู้ CU 4 ช่อง", "unit_of_measure": "ตู้", "labor_components": [{"labor_id": "L-91-01"}], "material_components": [{"material_id": "M-CU-4CH", "spec": "ตู้ CU 4 ช่อง"}, {"material_id": "M-CU-LABELS", "spec": "สติ๊กเกอร์ระบุวงจร"}] },
        { "task_id": "9.2", "task_name": "เปลี่ยนตู้ CU 6 ช่อง", "unit_of_measure": "ตู้", "labor_components": [{"labor_id": "L-91-01"}], "material_components": [{"material_id": "M-CU-6CH", "spec": "ตู้ CU 6 ช่อง"}, {"material_id": "M-CU-LABELS", "spec": "สติ๊กเกอร์ระบุวงจร"}] },
        { "task_id": "9.3", "task_name": "เปลี่ยนตู้ CU 8 ช่อง", "unit_of_measure": "ตู้", "labor_components": [{"labor_id": "L-91-01"}], "material_components": [{"material_id": "M-CU-8CH", "spec": "ตู้ CU 8 ช่อง"}, {"material_id": "M-CU-LABELS", "spec": "สติ๊กเกอร์ระบุวงจร"}] },
        { "task_id": "9.4", "task_name": "เปลี่ยนตู้ CU 10 ช่อง", "unit_of_measure": "ตู้", "labor_components": [{"labor_id": "L-91-01"}], "material_components": [{"material_id": "M-CU-10CH", "spec": "ตู้ CU 10 ช่อง"}, {"material_id": "M-CU-LABELS", "spec": "สติ๊กเกอร์ระบุวงจร"}] },
        { "task_id": "9.5", "task_name": "เปลี่ยนตู้ CU 12 ช่อง", "unit_of_measure": "ตู้", "labor_components": [{"labor_id": "L-91-01"}], "material_components": [{"material_id": "M-CU-12CH", "spec": "ตู้ CU 12 ช่อง"}, {"material_id": "M-CU-LABELS", "spec": "สติ๊กเกอร์ระบุวงจร"}] }
    ]},
    { "category_id": "10.0", "category_name": "วัสดุเพิ่มเติม", "tasks": [
        { "task_id": "10.1", "task_name": "เบรกเกอร์ลูกย่อย 16A", "unit_of_measure": "ตัว", "labor_components": [], "material_components": [{"material_id": "M-CB-1P-16A", "spec": "MCB 1P 16A"}] },
        { "task_id": "10.2", "task_name": "เบรกเกอร์ลูกย่อย 20A", "unit_of_measure": "ตัว", "labor_components": [], "material_components": [{"material_id": "M-CB-1P-20A", "spec": "MCB 1P 20A"}] },
        { "task_id": "10.3", "task_name": "เบรกเกอร์ลูกย่อย 32A", "unit_of_measure": "ตัว", "labor_components": [], "material_components": [{"material_id": "M-CB-1P-32A", "spec": "MCB 1P 32A"}] }
    ]},
    { "category_id": "11.0", "category_name": "งานระบบแรงดันต่ำและสื่อสาร", "tasks": [
        { "task_id": "11.1", "task_name": "ติดตั้งจุด LAN (Cat6)", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-LAN-POINT"}], "material_components": [{"material_id": "M-LAN-RJ45-OUTLET", "spec": "เต้ารับ LAN RJ45 Cat6"}, {"material_id": "M-PLATE-1CH", "spec": "หน้ากาก 1 ช่อง"}, {"material_id": "M-BOX-SURFACE-2X4", "spec": "กล่องลอย 2x4\""}] },
        { "task_id": "11.2", "task_name": "เดินสาย LAN (Cat6)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-LAN-WIRING"}], "material_components": [{"material_id": "M-LAN-CABLE-CAT6", "spec": "สาย UTP Cat6"}] },
        { "task_id": "11.3", "task_name": "ติดตั้งจุด TV (RG6)", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-TV-POINT"}], "material_components": [{"material_id": "M-TV-OUTLET", "spec": "เต้ารับ TV RG6"}, {"material_id": "M-PLATE-1CH", "spec": "หน้ากาก 1 ช่อง"}, {"material_id": "M-BOX-SURFACE-2X4", "spec": "กล่องลอย 2x4\""}] },
        { "task_id": "11.4", "task_name": "เดินสาย TV (RG6)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-TV-WIRING"}], "material_components": [{"material_id": "M-TV-CABLE-RG6", "spec": "สาย Coaxial RG6"}] },
        { "task_id": "11.5", "task_name": "ติดตั้งกล้องวงจรปิด (CCTV)", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-CCTV-POINT"}], "material_components": [{"material_id": "M-CCTV-CAMERA", "spec": "กล้อง CCTV มาตรฐาน"}, {"material_id": "M-CCTV-CABLE-10M", "spec": "สายสัญญาณสำเร็จ 10 เมตร"}, {"material_id": "M-CCTV-ADAPTER", "spec": "Adapterแปลงไฟสำหรับกล้อง"}, {"material_id": "M-CCTV-BOX-4X4", "spec": "บ็อกซ์กันน้ำ 4x4\""}] }
    ]},
    { "category_id": "12.0", "category_name": "งานติดตั้งเบรกเกอร์ย่อย", "tasks": [
        { "task_id": "12.1", "task_name": "ติดตั้งเบรกเกอร์ย่อยพร้อมกล่องลอย", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-BREAKER-INSTALL"}], "material_components": [{"material_id": "M-BOX-BREAKER-SURFACE-1P", "spec":"กล่องเบรกเกอร์ลอย 1 ช่อง"}] }
    ]},
     { "category_id": "13.0", "category_name": "อุปกรณ์ประกอบท่อ", "tasks": [
        { "task_id": "13.1", "task_name": "คอนเนคเตอร์ PVC 1/2\"", "unit_of_measure": "ตัว", "labor_components": [], "material_components": [{"material_id": "M-CONN-PVC-CONNECTOR", "spec":"คอนเนคเตอร์ท่อ PVC 1/2\""}] },
        { "task_id": "13.2", "task_name": "คอนเนคเตอร์ EMT 1/2\"", "unit_of_measure": "ตัว", "labor_components": [], "material_components": [{"material_id": "M-CONN-EMT-CONNECTOR", "spec":"คอนเนคเตอร์ท่อ EMT 1/2\""}] }
    ]},
    { "category_id": "14.0", "category_name": "งานราง PVC", "tasks": [
        { "task_id": "14.1", "task_name": "เดินราง PVC สีขาว", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-PVC-TRUNKING"}], "material_components": [{"material_id": "M-PVC-TRUNKING-20x40", "spec": "ราง PVC 20x40mm (รวมข้องอ/ข้อต่อเฉลี่ย)"}] }
    ]},
    { "category_id": "15.0", "category_name": "งานแสงสว่างใหม่", "tasks": [
        { "task_id": "15.1", "task_name": "ติดตั้งโคมไฟ LED Panel สำเร็จรูป", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-41-01"}], "material_components": [{"material_id": "M-LIGHT-SET-LED-PANEL", "spec": "โคมไฟ LED Panel 9W สำเร็จรูป"}] },
        { "task_id": "15.2", "task_name": "ติดตั้งชุดโคมไฟฟลูออเรสเซนต์ T8", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-T8-INSTALL"}], "material_components": [{"material_id": "M-LIGHT-SET-T8", "spec": "ชุดโคม T8 (ราง, หลอด, บัลลาสต์, สตาร์ทเตอร์)"}] }
    ]},
    { "category_id": "16.0", "category_name": "งานสายเฉพาะทาง", "tasks": [
        { "task_id": "16.1", "task_name": "เดินสาย VCT 2C 2.5mm² (L,N,G)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-VCT-WIRING"}], "material_components": [{"material_id": "M-CABLE-VCT-2C-2.5"}, {"material_id": "M-WIRE-THW-2.5-GRN"}] },
        { "task_id": "16.2", "task_name": "เดินสาย NYY 2C 2.5mm² (L,N,G)", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-NYY-WIRING"}], "material_components": [{"material_id": "M-CABLE-NYY-2C-2.5"}, {"material_id": "M-WIRE-THW-2.5-GRN"}, {"material_id": "M-WATERPROOF-BOX", "spec": "กล่องต่อสายกันน้ำ", "usage_logic": "0.1 per meter"}] }
    ]},
    { "category_id": "17.0", "category_name": "งานเมนภายนอก", "tasks": [
        { "task_id": "17.1", "task_name": "ปักเสาไฟฟ้า 6.0ม.", "unit_of_measure": "ต้น", "labor_components": [{"labor_id": "L-POLE-6.0M"}], "material_components": [{"material_id": "M-POLE-6.0M"}] },
        { "task_id": "17.1-B", "task_name": "ปักเสาไฟฟ้า 7.0ม.", "unit_of_measure": "ต้น", "labor_components": [{"labor_id": "L-POLE-7.0M"}], "material_components": [{"material_id": "M-POLE-7.0M"}] },
        { "task_id": "17.2", "task_name": "ปักเสาไฟฟ้า 8.0ม.", "unit_of_measure": "ต้น", "labor_components": [{"labor_id": "L-POLE-8.0M"}], "material_components": [{"material_id": "M-POLE-8.0M"}] },
        { "task_id": "17.3", "task_name": "ปักเสาไฟฟ้า 9.0ม.", "unit_of_measure": "ต้น", "labor_components": [{"labor_id": "L-POLE-9.0M"}], "material_components": [{"material_id": "M-POLE-9.0M"}] },
        { "task_id": "17.4-2", "task_name": "ติดตั้งแร็ค 2 ชุด", "unit_of_measure": "ชุด", "labor_components": [{"labor_id": "L-RACK-INSTALL"}], "material_components": [{"material_id": "M-RACK-2SET"}] },
        { "task_id": "17.4-4", "task_name": "ติดตั้งแร็ค 4 ชุด", "unit_of_measure": "ชุด", "labor_components": [{"labor_id": "L-RACK-INSTALL"}], "material_components": [{"material_id": "M-RACK-4SET"}] },
        { "task_id": "17.4-1", "task_name": "ติดตั้งแร็ค 1 ชุด", "unit_of_measure": "ชุด", "labor_components": [{"labor_id": "L-RACK-INSTALL"}], "material_components": [{"material_id": "M-RACK-1SET"}] },
        { "task_id": "17.5", "task_name": "เดินสายเมน THW/THW-A", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-11-01"}], "material_components": [
            {"material_id": "M-CABLE-THW-10"}, {"material_id": "M-CABLE-THW-16"}, {"material_id": "M-CABLE-THW-25"}, {"material_id": "M-CABLE-THW-35"}, {"material_id": "M-CABLE-THW-50"},
            {"material_id": "M-CABLE-THW-A-16"}, {"material_id": "M-CABLE-THW-A-25"}, {"material_id": "M-CABLE-THW-A-35"}, {"material_id": "M-CABLE-THW-A-50"}
        ]}
    ]},
    { "category_id": "18.0", "category_name": "งาน EV Charger", "tasks": [
        { "task_id": "18.1", "task_name": "ติดตั้ง EV Charger (รวมอุปกรณ์)", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-EV-INSTALL-20M"}], "material_components": [{"material_id": "M-EV-CHARGER-7KW"}, {"material_id": "M-RCD-TYPE-B"}, {"material_id": "M-CABLE-THW-16"}, {"material_id": "M-CONDUIT-EMT-3/4"}] },
        { "task_id": "18.2", "task_name": "ค่าธรรมเนียมมิเตอร์ TOU", "unit_of_measure": "จุด", "labor_components": [], "material_components": [{"material_id": "FEE-TOU-METER"}] }
    ]},
    { "category_id": "19.0", "category_name": "งานรื้อถอน", "tasks": [
        { "task_id": "19.1", "task_name": "รื้อถอนดวงโคม", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-DEMO-DOWNLIGHT"}], "material_components": [] },
        { "task_id": "19.2", "task_name": "รื้อถอนเต้ารับ/สวิตช์", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-DEMO-OUTLET-SWITCH"}], "material_components": [] },
        { "task_id": "19.3", "task_name": "รื้อถอนสาย/ท่อ", "unit_of_measure": "เมตร", "labor_components": [{"labor_id": "L-DEMO-PIPE"}], "material_components": [] },
        { "task_id": "19.4", "task_name": "รื้อถอนเครื่องปรับอากาศ", "unit_of_measure": "เครื่อง", "labor_components": [{"labor_id": "L-DEMO-AC"}], "material_components": [] },
        { "task_id": "19.5", "task_name": "ค่าแรงซ่อมผนัง", "unit_of_measure": "จุด", "labor_components": [{"labor_id": "L-REPAIR-WALL-POINT"}], "material_components": [] }
    ]}
];
