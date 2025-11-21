// modules/components.js
// UI Components (Fixed: Explicit Cable Selection)

export const renderProjectInfoCard = () => `
    <div class="config-card mb-6">
        <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-slate-200 pb-2 mb-4">ข้อมูลโครงการ</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div><label class="block text-sm font-medium text-slate-600">ชื่อโครงการ</label><input class="form-input mt-1 block w-full" id="project_name" placeholder="เช่น บ้านคุณสมชาย" type="text"/></div>
            <div><label class="block text-sm font-medium text-slate-600">ชื่อลูกค้า</label><input class="form-input mt-1 block w-full" id="customer_name" placeholder="ชื่อ-นามสกุล" type="text"/></div>
            <div><label class="block text-sm font-medium text-slate-600">วันที่</label><input class="form-input mt-1 block w-full" id="report_date" type="date"/></div>
        </div>
    </div>
`;

export const renderWorkDetails = () => `
    <div class="space-y-6">
        <h2 class="text-2xl font-bold text-blue-600 border-b-2 border-slate-200 pb-2">1. ระบุรายละเอียดงาน</h2>

        <!-- Card 1: Main Electrical (User Chooses Size) -->
        <div class="config-card collapsible-card">
            <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานเดินสายเมนไฟฟ้าภายนอก</span></h3>
            <div class="space-y-4">
                <div class="p-4 border rounded-lg bg-blue-50 space-y-4">
                    <h4 class="font-semibold text-blue-800">ส่วนเสาไฟฟ้าและแร็ค</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-slate-600">ความสูงเสา</label><select class="form-input mt-1 block w-full" id="pole_height_7"><option value="0">-- ไม่ปักเสา --</option><option value="6.0">6.0 เมตร</option><option value="7.0">7.0 เมตร</option><option value="8.0">8.0 เมตร</option><option value="9.0">9.0 เมตร</option></select></div>
                        <div><label class="block text-sm font-medium text-slate-600">จำนวนเสาที่ปัก (ต้น)</label><input class="form-input mt-1 block w-full" id="pole_count_7" min="0" placeholder="0" type="number"/></div>
                        <div><label class="block text-sm font-medium text-slate-600">ติดตั้งแร็ค 2 ชุด (ต้น)</label><input class="form-input mt-1 block w-full" id="rack_2_sets_7" min="0" placeholder="0" type="number"/></div>
                        <div><label class="block text-sm font-medium text-slate-600">ติดตั้งแร็ค 1 ชุด (ต้น)</label><input class="form-input mt-1 block w-full" id="rack_1_set_7" min="0" placeholder="0" type="number"/></div>
                        <div><label class="block text-sm font-medium text-slate-600">ติดตั้งแร็ค 4 ชุด (ต้น)</label><input class="form-input mt-1 block w-full" id="rack_4_sets_7" min="0" placeholder="0" type="number"/></div>
                    </div>
                </div>
                <div class="p-4 border rounded-lg bg-blue-50 space-y-4">
                    <h4 class="font-semibold text-blue-800">ส่วนสายเมนภายนอก (เดินลอย)</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><label class="block text-sm font-medium text-slate-600">เขตการไฟฟ้า</label><select class="form-input mt-1 block w-full bg-slate-100" id="main_authority_7"><option value="MEA">กฟน. (นครหลวง)</option><option value="PEA">กฟภ. (ภูมิภาค)</option></select></div>
                        <div><label class="block text-sm font-medium text-slate-600">ขนาดมิเตอร์ (สำหรับอ้างอิง)</label><select class="form-input mt-1 block w-full" id="meter_size_3"><option value="5(15)">5(15)A</option><option selected="" value="15(45)">15(45)A</option><option value="30(100)">30(100)A</option><option value="50(150)">50(150)A (1 เฟส)</option></select></div>
                        
                        <!-- User Selects Cable Here -->
                        <div><label class="block text-sm font-medium text-slate-600">ชนิดสายเมน</label><select class="form-input mt-1 block w-full" id="main_ext_type_7"><option value="THW">ทองแดง (THW)</option><option value="THW-A">อะลูมิเนียม (THW-A)</option></select></div>
                        <div>
                             <label class="block text-sm font-medium text-slate-600">ขนาดสายเมน (ตร.มม.) <span class="text-red-500">*ต้องเลือก</span></label>
                             <select class="form-input mt-1 block w-full font-bold text-blue-900" id="main_cable_size_7">
                                <option value="10">10 sq.mm</option>
                                <option value="16" selected>16 sq.mm</option>
                                <option value="25">25 sq.mm</option>
                                <option value="35">35 sq.mm</option>
                                <option value="50">50 sq.mm</option>
                            </select>
                            <p class="text-xs text-gray-500 mt-1" id="main_cable_spec_display"></p> <!-- คำแนะนำจะขึ้นตรงนี้ -->
                        </div>

                        <div class="md:col-span-2"><label class="block text-sm font-medium text-slate-600">ระยะทางสายเมน (เมตร)</label><input class="form-input mt-1 block w-full" id="main_ext_dist_7" min="0" placeholder="0" type="number"/></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Card 2: Consumer Unit -->
        <div class="config-card collapsible-card">
            <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>ตู้ควบคุมและเบรกเกอร์</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div><label class="block text-sm font-medium text-slate-600">เปลี่ยนตู้คอนซูมเมอร์ยูนิต (CU)</label><select class="form-input mt-1 block w-full" id="cu_replacement"><option value="none">-- ไม่เปลี่ยน --</option><option value="4_slot">4 ช่อง</option><option value="6_slot">6 ช่อง</option><option value="8_slot">8 ช่อง</option><option value="10_slot">10 ช่อง</option><option value="12_slot">12 ช่อง</option></select></div>
                <div class="space-y-2">
                    <label class="flex items-center"><input class="h-4 w-4 rounded border-gray-300 text-blue-600" id="install_ground" type="checkbox"/><span class="ml-2 text-slate-700">ติดตั้งหลักดินใหม่</span></label>
                    <div><label class="block text-xs font-medium text-slate-500">ระยะสายดินไปตู้ไฟ (เมตร)</label><input class="form-input mt-1 block w-full sm:text-sm" id="ground_distance" min="0" placeholder="0" type="number"/></div>
                </div>
            </div>
            <div class="mt-4 pt-4 border-t">
                <h4 class="text-md font-semibold text-slate-800">เพิ่มเบรกเกอร์ลูกย่อย (MCB)</h4>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    <div><label class="block text-xs font-medium text-slate-500">16A (แสงสว่าง)</label><input class="form-input mt-1 block w-full sm:text-sm" id="mcb_16a" min="0" placeholder="0" type="number"/></div>
                    <div><label class="block text-xs font-medium text-slate-500">20A (เต้ารับ/แอร์)</label><input class="form-input mt-1 block w-full sm:text-sm" id="mcb_20a" min="0" placeholder="0" type="number"/></div>
                    <div><label class="block text-xs font-medium text-slate-500">32A (น้ำอุ่น/ปั๊ม)</label><input class="form-input mt-1 block w-full sm:text-sm" id="mcb_32a" min="0" placeholder="0" type="number"/></div>
                </div>
            </div>
        </div>

        <!-- Card 3: Sockets -->
        <div class="config-card collapsible-card">
            <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานเต้ารับไฟฟ้า</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-600">จำนวนวงจรเต้ารับ</label><input class="form-input mt-1 block w-full" id="socket_circuits" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">รูปแบบติดตั้ง</label><select class="form-input mt-1 block w-full" id="socket_type"><option value="surface_vaf">เดินลอย ตีกิ๊ป (VAF)</option><option value="surface_pvc">เดินในท่อ PVC ลอย</option><option value="concealed_pvc">เดินในท่อ PVC ฝังผนัง (รวมกรีด)</option><option value="surface_emt">เดินในท่อ EMT ลอย</option><option value="surface_pvc_trunking">เดินในราง PVC ขาว</option></select></div>
            </div>
            <div class="mt-4 space-y-4" id="socket_circuits_container"></div>
        </div>

        <!-- Card 4: Lighting -->
        <div class="config-card collapsible-card">
            <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานแสงสว่าง</span></h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-600">จำนวนวงจรแสงสว่าง</label><input class="form-input mt-1 block w-full" id="light_circuits" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">รูปแบบติดตั้ง</label><select class="form-input mt-1 block w-full" id="light_type"><option value="surface_pvc">เดินในท่อ PVC ลอย</option><option value="concealed_pvc">เดินในท่อ PVC ฝังฝ้า/ผนัง</option><option value="surface_emt">เดินในท่อ EMT ลอย</option><option value="surface_pvc_trunking">เดินในราง PVC ขาว</option></select></div>
                <div class="md:col-span-2"><label class="block text-sm font-medium text-slate-600">ประเภทโคมไฟ</label><select class="form-input mt-1 block w-full" id="fixture_type_1"><option value="LED_E27">โคมดาวน์ไลท์ + หลอด LED E27</option><option value="LED_PANEL">โคมไฟฝังฝ้า LED สำเร็จรูป (Panel)</option><option value="T8_SET">ชุดโคมไฟฟลูออเรสเซนต์ T8</option></select></div>
            </div>
            <div class="mt-4 space-y-4" id="light_circuits_container"></div>
        </div>

        <!-- Card 5: Dedicated Wiring -->
        <div class="config-card collapsible-card">
            <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานเดินสายไฟเฉพาะจุด (แอร์/น้ำอุ่น)</span></h3>
            <div class="space-y-4 pt-4 border-t">
                <h4 class="font-semibold text-slate-800 border-b pb-2">งานเดินสายไฟเครื่องปรับอากาศ</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label class="block text-sm font-medium text-slate-600">จำนวนเครื่อง</label><input class="form-input mt-1 block w-full" id="ac_wiring_units" min="0" placeholder="0" type="number"/></div>
                    <div class="md:col-span-2"><label class="block text-sm font-medium text-slate-600">รูปแบบติดตั้ง</label><select class="form-input mt-1 block w-full" id="ac_install_type_4"><option value="surface_pvc">เดินในท่อ PVC ลอย (THW)</option><option value="concealed_pvc">เดินในท่อ PVC ฝัง (THW)</option><option value="surface_emt">เดินในท่อ EMT ลอย (THW)</option><option value="surface_pvc_trunking">เดินในราง PVC ขาว</option></select></div>
                </div>
                <div class="mt-4 space-y-4" id="ac_wiring_circuits_container"></div>
            </div>
            <div class="space-y-4 pt-4 border-t mt-6">
                <h4 class="font-semibold text-slate-800 border-b pb-2">งานเดินสายไฟเครื่องทำน้ำอุ่น</h4>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label class="block text-sm font-medium text-slate-600">จำนวนเครื่อง</label><input class="form-input mt-1 block w-full" id="heater_wiring_units" min="0" placeholder="0" type="number"/></div>
                    <div class="md:col-span-2"><label class="block text-sm font-medium text-slate-600">รูปแบบติดตั้ง</label><select class="form-input mt-1 block w-full" id="wh_install_type_5"><option value="surface_pvc">เดินในท่อ PVC ลอย (THW)</option><option value="concealed_pvc">เดินในท่อ PVC ฝัง (THW)</option><option value="surface_emt">เดินในท่อ EMT ลอย (THW)</option><option value="surface_pvc_trunking">เดินในราง PVC ขาว</option></select></div>
                </div>
                <div class="mt-4 space-y-4" id="heater_wiring_circuits_container"></div>
            </div>
        </div>

        ${renderRestOfCards()}
    </div>
`;

const renderRestOfCards = () => `
    <div class="config-card collapsible-card">
        <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานระบบแรงดันต่ำและสื่อสาร</span></h3>
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div><label class="block text-sm font-medium text-slate-600">จุด LAN (Cat6)</label><input class="form-input mt-1 block w-full" id="lan_points" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">ระยะเดินสาย LAN (รวมทุกจุด)</label><input class="form-input mt-1 block w-full" id="lan_distance" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">จุด TV (RG6)</label><input class="form-input mt-1 block w-full" id="tv_points" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">ระยะเดินสาย TV (รวมทุกจุด)</label><input class="form-input mt-1 block w-full" id="tv_distance" min="0" placeholder="0" type="number"/></div>
                <div class="md:col-span-2"><label class="block text-sm font-medium text-slate-600">จุดกล้องวงจรปิด (CCTV)</label><input class="form-input mt-1 block w-full" id="cctv_points" min="0" placeholder="0" type="number"/></div>
            </div>
        </div>
    </div>

    <div class="config-card collapsible-card">
        <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานติดตั้งเครื่องใช้ไฟฟ้า</span></h3>
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 mt-2">
                <div><label class="block text-sm font-medium text-slate-600">เครื่องทำน้ำอุ่น (เครื่อง)</label><input class="form-input mt-1 block w-full" id="heater_units" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">เครื่องปรับอากาศ (เครื่อง)</label><input class="form-input mt-1 block w-full" id="ac_units" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">ปั๊มน้ำ (เครื่อง)</label><input class="form-input mt-1 block w-full" id="pump_units" min="0" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-600">รูปแบบติดตั้งปั๊มน้ำ</label><select class="form-input mt-1 block w-full" id="wp_install_type_6"><option value="pvc_clip">เดินท่อ PVC ขาว ตีกิ๊บ (THW)</option><option value="vct_clip">เดินสาย VCT ตีกิ๊บ</option><option value="nyy_burial">เดินร้อยท่อฝังดิน (สาย NYY)</option></select></div>
                <div><label class="block text-sm font-medium text-slate-600">พัดลมเพดาน/ดูดอากาศ (เครื่อง)</label><input class="form-input mt-1 block w-full" id="fan_units" min="0" placeholder="0" type="number"/></div>
            </div>
        </div>
    </div>

    <div class="config-card collapsible-card">
        <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานบริการและตรวจซ่อม</span></h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label class="flex items-start p-3 bg-slate-50 rounded-lg border"><input class="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600" id="service_inspection" type="checkbox"/><span class="ml-3 text-sm"><span class="font-semibold text-slate-800">ตรวจเช็คระบบไฟฟ้าประจำปี</span></span></label>
            <label class="flex items-start p-3 bg-slate-50 rounded-lg border"><input class="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600" id="service_leak_find" type="checkbox"/><span class="ml-3 text-sm"><span class="font-semibold text-slate-800">ค้นหาจุดไฟฟ้ารั่ว</span></span></label>
            <label class="flex items-start p-3 bg-slate-50 rounded-lg border"><input class="h-4 w-4 mt-1 rounded border-gray-300 text-blue-600" id="service_trip_find" type="checkbox"/><span class="ml-3 text-sm"><span class="font-semibold text-slate-800">ตรวจสอบเบรกเกอร์ทริป</span></span></label>
            <div class="flex items-center space-x-2 p-3 bg-slate-50 rounded-lg border"><label class="text-sm font-semibold text-slate-800">เปลี่ยนหลอดไฟ</label><input class="form-input block w-full sm:text-sm" id="service_lamp_replace" min="0" placeholder="0" type="number"/><span class="text-sm text-slate-600">จุด</span></div>
        </div>
    </div>

    <div class="config-card collapsible-card">
        <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานติดตั้งเครื่องชาร์จ EV</span></h3>
        <div class="flex items-center justify-between mb-4 border-b pb-2">
            <label class="flex items-center cursor-pointer w-full"><span class="mr-3 text-sm font-medium text-slate-700">คำนวณงานติดตั้ง EV Charger</span><input class="form-input h-4 w-4" id="toggle_ev_charger_visibility" type="checkbox"/></label>
        </div>
        <div class="p-4 border rounded-lg bg-blue-50 space-y-4 hidden" id="ev_charger_content_wrapper">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label class="block text-sm font-medium text-slate-600">รูปแบบการติดตั้ง</label><select class="form-input mt-1 block w-full" id="ev_install_type_8"><option value="existing_meter">พ่วงกับมิเตอร์เดิม</option><option value="new_meter_tou">ขอติดตั้งมิเตอร์ลูกที่ 2 (TOU)</option></select></div>
                <div><label class="block text-sm font-medium text-slate-600">กำลังไฟของเครื่องชาร์จ</label><select class="form-input mt-1 block w-full" id="ev_power_8"><option value="7.4kW">7.4 kW (1 เฟส)</option><option value="22kW">22 kW (3 เฟส)</option></select></div>
                <div><label class="block text-sm font-medium text-slate-600">ระยะทางเดินสาย (เมตร)</label><input class="form-input mt-1 block w-full" id="ev_cable_dist_8" min="0" placeholder="20" type="number" value="20"/></div>
                <div><label class="block text-sm font-medium text-slate-600">ค่าเครื่อง EV Charger (ถ้าซื้อเองใส่ 0)</label><input class="form-input mt-1 block w-full" id="ev_charger_cost_8" min="0" placeholder="35000" type="number" value="35000"/></div>
            </div>
        </div>
    </div>

    <div class="config-card collapsible-card">
        <h3 class="text-xl font-bold mb-4 text-slate-700 flex items-center gap-3"><span>งานรื้อถอนและย้ายแนว</span></h3>
        <div class="p-4 border rounded-lg bg-red-50 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div><label class="block text-sm font-medium text-slate-600">รื้อดวงโคม (จุด)</label><input class="form-input mt-1 block w-full" id="demo_lights_9" min="0" placeholder="0" type="number" value="0"/></div>
                <div><label class="block text-sm font-medium text-slate-600">รื้อเต้ารับ/สวิตช์ (จุด)</label><input class="form-input mt-1 block w-full" id="demo_outlets_9" min="0" placeholder="0" type="number" value="0"/></div>
                <div><label class="block text-sm font-medium text-slate-600">รื้อสาย/ท่อ (เมตร)</label><input class="form-input mt-1 block w-full" id="demo_cables_9" min="0" placeholder="0" type="number" value="0"/></div>
                <div><label class="block text-sm font-medium text-slate-600">รื้อแอร์ (เครื่อง)</label><input class="form-input mt-1 block w-full" id="demo_ac_9" min="0" placeholder="0" type="number" value="0"/></div>
            </div>
            <div class="mt-4"><label class="flex items-center"><input class="h-4 w-4 text-red-600 border-gray-300 rounded" id="demo_include_repair_9" type="checkbox"/><span class="ml-2 text-slate-700">รวมค่าแรงอุด/ซ่อม/ฉาบผนัง (ต่อจุด)</span></label></div>
        </div>
    </div>
`;

export const renderSettingsCard = () => `
    <section class="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 class="text-2xl font-bold mb-4 border-b pb-2 text-blue-600">2. ตั้งค่าการคำนวณ</h2>
        <div class="space-y-4">
            <div><label class="block text-sm font-medium text-slate-600">เลือกจังหวัด</label><select class="form-input mt-1 block w-full" id="province_selector"></select></div>
            <div class="hidden" id="bkk_zone_container"><label class="block text-sm font-medium text-slate-600">เลือกโซนในกรุงเทพฯ</label><select class="form-input mt-1 block w-full" id="bkk_zone_selector"><option value="BKK_Zone5_Suburban">โซนทั่วไป / ชานเมือง</option><option value="BKK_Zone1_CBD">โซน 1: Core CBD (สาทร/สีลม)</option><option value="BKK_Zone2_Transit">โซน 2: Transit Hub (พระโขนง)</option><option value="BKK_Zone3_Industrial">โซน 3: Industrial Hub (ลาดกระบัง)</option><option value="BKK_Zone4_MidTier">โซน 4: Mid-Tier (ลาดพร้าว)</option></select></div>
            <div><label class="block text-sm font-medium text-slate-600">คุณภาพวัสดุ</label><select class="form-input mt-1 block w-full" id="material_quality"><option value="1.0">มาตรฐาน</option><option value="1.4">คุณภาพ</option><option value="1.8">พรีเมียม</option></select></div>
            <div><label class="block text-sm font-medium text-slate-600">เผื่อวัสดุเสียหาย (%)</label><input class="form-input mt-1 block w-full" id="wastage_factor" type="number" value="0"/></div>
            <div><label class="block text-sm font-medium text-slate-600">ค่าดำเนินการ (%)</label><input class="form-input mt-1 block w-full" id="overhead_factor" type="number" value="0"/></div>
            <div><label class="block text-sm font-medium text-slate-600">กำไร (%)</label><input class="form-input mt-1 block w-full" id="profit_factor" type="number" value="0"/></div>
            <div class="pt-2 border-t border-slate-200"><label class="flex items-center"><input class="h-4 w-4 rounded border-gray-300 text-blue-600" id="include_vat" type="checkbox"/><span class="ml-2 text-sm font-medium text-slate-700">คิด VAT 7%</span></label></div>
            <div><label class="block text-sm font-medium text-slate-600">ค่าบริการขั้นต่ำ</label><input class="form-input mt-1 block w-full" id="min_charge" type="number" value="1000"/></div>
        </div>
    </section>
`;

export const renderSummaryCard = () => `
    <section class="bg-white p-6 rounded-xl shadow-xl">
        <h2 class="text-2xl font-bold mb-4 border-b pb-2 text-blue-600">สรุปราคาเบื้องต้น</h2>
        <div class="text-center py-4">
            <p class="text-lg text-slate-500" id="total-display-label">ยอดรวมสุทธิ</p>
            <p class="text-5xl font-bold text-slate-800 my-2" id="total-display">฿0.00</p>
        </div>
        <div class="mt-4 grid grid-cols-1 gap-3">
            <button class="btn btn-primary text-lg w-full" id="calculate-btn">คำนวณและสร้างเอกสาร</button>
        </div>
    </section>
    <section class="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 class="text-2xl font-bold mb-4 border-b pb-2 text-blue-600">3. แก้ไขราคา (บาท)</h2>
        <div class="max-h-60 overflow-y-auto">
            <table class="w-full text-sm">
                <thead class="bg-slate-50 sticky top-0"><tr><th class="p-2 text-left">รหัส</th><th class="p-2 text-left">ราคา</th></tr></thead>
                <tbody id="price-editor-body"></tbody>
            </table>
        </div>
    </section>
`;

export const renderJobCostingSection = () => `
    <div class="no-print p-4 border border-blue-200 rounded-lg bg-blue-50 mb-6" id="manual-item-adder-section">
        <h3 class="text-lg font-semibold text-blue-800 mb-3">เพิ่มงานเอง (Job Costing)</h3>
        <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="md:col-span-2"><label class="block text-sm font-medium text-slate-700">ชื่องาน</label><input class="form-input mt-1 block w-full" id="manual-job-name" placeholder="เช่น ค่าซ่อมฝ้า" type="text"/></div>
                <div><label class="block text-sm font-medium text-slate-700">ค่าแรงรวม (บาท)</label><input class="form-input mt-1 block w-full" id="manual-job-labor-total" placeholder="0" type="number"/></div>
                <div><label class="block text-sm font-medium text-slate-700">จำนวนงาน</label><input class="form-input mt-1 block w-full" id="manual-job-qty" placeholder="1" type="number" value="1"/></div>
                <div><label class="block text-sm font-medium text-slate-700">หน่วยงาน</label><input class="form-input mt-1 block w-full" id="manual-job-unit" placeholder="งาน" type="text" value="งาน"/></div>
            </div>
            <div class="border-t pt-3">
                <h4 class="text-md font-semibold text-slate-700">ลิสต์วัสดุสำหรับใบสั่งซื้อ</h4>
                <table class="w-full mt-2" id="manual-job-materials-table">
                    <thead><tr><th>รายการวัสดุ</th><th class="w-20">จำนวน</th><th class="w-24">หน่วย</th><th class="w-28">ราคา/หน่วย</th><th class="w-10"></th></tr></thead>
                    <tbody></tbody>
                </table>
                <button class="btn text-sm py-1 px-3 mt-2 bg-white border border-blue-500 text-blue-500 hover:bg-blue-50" id="manual-job-add-material-row">+ เพิ่มแถววัสดุ</button>
            </div>
            <div class="text-right border-t pt-4">
                <button class="btn btn-primary py-2 px-4" id="manual-job-add-btn">+ เพิ่มงานนี้เข้าระบบ</button>
            </div>
        </div>
    </div>
`;
