// main.js
// เวอร์ชัน V2.3 (Fixed): แสดงราคาเบรกเกอร์และข้อมูลมาตรฐาน

import { provinces, provinceZones } from './data/provinces.js';
import { mainCableSpecs } from './data/electrical_data.js';
import { calculateProjectCost, setPrice, getPriceList } from './modules/calculator.js';
import { renderCircuitInputs, renderDedicatedCircuitInputs, renderDynamicInputs, formatCurrency } from './modules/ui_renderer.js';
import { generateReport } from './modules/report_generator.js';
import { renderProjectInfoCard, renderWorkDetails, renderSettingsCard, renderSummaryCard, renderJobCostingSection } from './modules/components.js';

// Global State
let manualBOQItems = [];
let manualPOItems = [];
let activeTab = 'boq-combined';

document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    console.log("App Starting (V2.3 Fixed)...");
    
    try {
        renderAppUI();
        setupStaticData();
        setupEventListeners();
        populatePriceEditor();
        
        // Initial Calculation
        handleProvinceChange(); 
        updateMainCableSuggestion(); 
        updateRealtimeTotal();
        
        console.log("App Initialized Successfully");
    } catch (error) {
        console.error("Initialization Error:", error);
        alert("เกิดข้อผิดพลาดในการโหลดระบบ: " + error.message);
    }
}

function renderAppUI() {
    const map = {
        'app-project-info': renderProjectInfoCard,
        'app-work-details': renderWorkDetails,
        'app-settings': renderSettingsCard,
        'app-summary': renderSummaryCard,
        'app-manual-job': renderJobCostingSection
    };
    for (const [id, func] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = func();
    }
}

function setupStaticData() {
    const ps = document.getElementById('province_selector');
    if(ps) { 
        ps.innerHTML = '';
        ps.add(new Option('กรุงเทพมหานคร', 'กรุงเทพมหานคร')); 
        provinces.forEach(p => ps.add(new Option(p, p))); 
        ps.value = 'นนทบุรี';
    }
    const rd = document.getElementById('report_date');
    if(rd) rd.valueAsDate = new Date();
}

function setupEventListeners() {
    document.body.addEventListener('change', (e) => {
        if(e.target.id === 'province_selector') handleProvinceChange();
        
        if(['main_authority_7', 'meter_size_3', 'main_ext_type_7'].includes(e.target.id)) {
            updateMainCableSuggestion();
        }
        
        if(e.target.id === 'toggle_ev_charger_visibility') handleEVToggle(e.target);
        
        // เมื่อเปลี่ยนขนาด BTU/Watt หรือเปลี่ยนเบรกเกอร์ -> อัปเดตคำแนะนำ
        if(e.target.classList.contains('dedicated-unit-size')) {
            updateBreakerSuggestion(e.target);
        }
        if(e.target.id.includes('breaker_select')) {
             // ถ้าเปลี่ยนเบรกเกอร์เอง ก็คำนวณราคาใหม่
             updateRealtimeTotal();
        }
        
        if(e.target.matches('input, select')) updateRealtimeTotal();
    });

    document.body.addEventListener('input', (e) => {
        if(e.target.matches('input[type="number"], input[type="text"]')) updateRealtimeTotal();
        if(e.target.classList.contains('point-count-input')) {
            renderDynamicInputs(e.target.dataset.prefix, e.target.dataset.index, parseInt(e.target.value)||0);
            updateRealtimeTotal();
        }
    });
    
    setupDynamicListener('socket_circuits', 'socket', 'socket_circuits_container');
    setupDynamicListener('light_circuits', 'light', 'light_circuits_container');
    setupDynamicListener('ac_wiring_units', 'ac_wiring', 'ac_wiring_circuits_container');
    setupDynamicListener('heater_wiring_units', 'heater_wiring', 'heater_wiring_circuits_container');

    const calcBtn = document.getElementById('calculate-btn');
    if(calcBtn) calcBtn.addEventListener('click', displayReport);
    
    setupExportButtons();
    setupManualJobListeners();
    setupTabListeners();
    setupCollapsibleCards();
}

function handleProvinceChange() {
    const province = document.getElementById('province_selector').value;
    const bkkZoneContainer = document.getElementById('bkk_zone_container');
    const authEl = document.getElementById('main_authority_7');

    if(bkkZoneContainer) {
        bkkZoneContainer.classList.toggle('hidden', province !== 'กรุงเทพมหานคร');
    }

    if(authEl) {
        const isMEA = provinceZones.MEA.includes(province);
        authEl.value = isMEA ? 'MEA' : 'PEA';
    }
    updateMainCableSuggestion();
}

function updateMainCableSuggestion() {
    const authority = document.getElementById('main_authority_7')?.value;
    const meterSize = document.getElementById('meter_size_3')?.value;
    const cableType = document.getElementById('main_ext_type_7')?.value;
    const displayEl = document.getElementById('main_cable_spec_display');
    
    if(!authority || !meterSize || !cableType || !displayEl) return;

    const thwAOption = document.getElementById('main_ext_type_7').querySelector('option[value="THW-A"]');
    if(authority === 'MEA') {
        if(thwAOption) thwAOption.disabled = true;
        if(cableType === 'THW-A') {
            document.getElementById('main_ext_type_7').value = 'THW';
            return updateMainCableSuggestion();
        }
    } else {
        if(thwAOption) thwAOption.disabled = false;
    }

    let suggestionText = "N/A";
    try {
        const size = mainCableSpecs[authority][meterSize][cableType];
        if (size) {
            suggestionText = `แนะนำ: ${cableType} ${size} sq.mm. (มาตรฐานการไฟฟ้า)`;
            displayEl.className = "text-xs text-green-600 mt-1 font-medium";
        } else {
            suggestionText = "ไม่พบข้อมูลมาตรฐาน";
            displayEl.className = "text-xs text-red-500 mt-1 font-medium";
        }
    } catch (e) {
        suggestionText = "-";
    }

    displayEl.textContent = suggestionText;
}

// --- Logic ใหม่: คำแนะนำเบรกเกอร์พร้อมแสดงราคาจริง ---
function updateBreakerSuggestion(selectElement) {
    const infoId = selectElement.dataset.targetInfo;
    const type = selectElement.dataset.type; // 'ac' or 'wh'
    const val = parseInt(selectElement.value);
    const infoEl = document.getElementById(infoId);
    
    if (!infoEl) return;

    let recommendedAmp = 0;
    let note = "";

    // Logic การเลือกขนาดเบรกเกอร์ตาม BTU/Watt
    if (type === 'ac') {
        if (val <= 12000) { recommendedAmp = 20; note = "แอร์ขนาดเล็ก (9000-12000 BTU)"; } 
        else if (val <= 18000) { recommendedAmp = 20; note = "ขนาดมาตรฐาน (12000-18000 BTU)"; }
        else if (val <= 24000) { recommendedAmp = 32; note = "ขนาดใหญ่ (18000-24000 BTU)"; }
        else { recommendedAmp = 32; note = "แอร์ขนาดใหญ่ (>24000 BTU)"; }
    } else { // wh (Water Heater)
        if (val <= 3500) { recommendedAmp = 20; note = "น้ำอุ่นทั่วไป (3500W)"; }
        else if (val <= 4500) { recommendedAmp = 32; note = "น้ำอุ่นกำลังสูง (4500W)"; } // ปรับเป็น 32A เพื่อความปลอดภัย
        else { recommendedAmp = 32; note = "น้ำร้อน/หม้อต้ม (>4500W)"; }
    }

    // ดึงราคาจาก Price List (ต้นน้ำถึงปลายน้ำ)
    const prices = getPriceList();
    let price = 0;
    let matCode = "";
    
    if (recommendedAmp <= 16) { matCode = "M-CB-1P-16A"; price = prices['M-CB-1P-16A'] || 0; }
    else if (recommendedAmp <= 20) { matCode = "M-CB-1P-20A"; price = prices['M-CB-1P-20A'] || 0; }
    else { matCode = "M-CB-1P-32A"; price = prices['M-CB-1P-32A'] || 0; }

    // อัปเดตข้อความแนะนำในกล่องเขียว
    const detailEl = infoEl.querySelector('div:last-child');
    if (detailEl) {
        detailEl.innerHTML = `
            มาตรฐานแนะนำ: <strong>${recommendedAmp} Amp</strong> (${note})<br>
            <span class="text-emerald-700">ราคาเบรกเกอร์: <strong>${price.toLocaleString()} บาท/ตัว</strong> (รหัส: ${matCode})</span>
        `;
    }
    
    // เก็บค่าแนะนำไว้ที่ info element เพื่อให้ buildQuantities อ่านได้ถ้าเลือก Auto
    infoEl.dataset.autoAmp = recommendedAmp;
}

function setupDynamicListener(id, type, containerId) {
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', (e) => {
        const count = parseInt(e.target.value)||0;
        if(type === 'socket' || type === 'light') {
            renderCircuitInputs(type, count, document.getElementById(containerId));
        } else {
            renderDedicatedCircuitInputs(type, count, document.getElementById(containerId));
            // Trigger update suggestion for new items immediately
            setTimeout(() => {
                document.querySelectorAll(`#${containerId} .dedicated-unit-size`).forEach(sel => updateBreakerSuggestion(sel));
            }, 0);
        }
    });
}

function handleEVToggle(checkbox) {
    const wrapper = document.getElementById('ev_charger_content_wrapper');
    if(wrapper) wrapper.classList.toggle('hidden', !checkbox.checked);
}

function buildQuantitiesFromDOM() {
    const quantities = new Map();
    const addQty = (id, val) => { 
        if(!val || val <= 0 || isNaN(val)) return;
        quantities.set(id, (quantities.get(id) || 0) + val);
    };
    const getVal = (id) => parseFloat(document.getElementById(id)?.value) || 0;
    const getInt = (id) => parseInt(document.getElementById(id)?.value) || 0;

    // 1. Pole & Main
    const ph = document.getElementById('pole_height_7')?.value;
    const pc = getInt('pole_count_7');
    if (pc > 0 && ph !== '0') {
        if (ph === '6.0') addQty('17.1', pc); 
        else if (ph === '7.0') addQty('17.1-B', pc);
        else if (ph === '8.0') addQty('17.2', pc); 
        else if (ph === '9.0') addQty('17.3', pc);
    }
    addQty('17.4-2', getInt('rack_2_sets_7'));
    addQty('17.4-4', getInt('rack_4_sets_7'));
    addQty('17.4-1', getInt('rack_1_set_7'));
    if (getVal('main_ext_dist_7') > 0) addQty('17.5', getVal('main_ext_dist_7'));

    // 2. CU
    const cu = document.getElementById('cu_replacement')?.value;
    if(cu !== 'none') {
        const map = {'4_slot':'9.1', '6_slot':'9.2', '8_slot':'9.3', '10_slot':'9.4', '12_slot':'9.5'};
        if(map[cu]) addQty(map[cu], 1);
    }
    if(document.getElementById('install_ground')?.checked) {
        addQty('6.1', 1); addQty('1.5', getVal('ground_distance'));
    }
    addQty('10.1', getInt('mcb_16a')); 
    addQty('10.2', getInt('mcb_20a')); 
    addQty('10.3', getInt('mcb_32a'));

    // 3. Sockets
    const sc = getInt('socket_circuits');
    const st = document.getElementById('socket_type')?.value;
    for(let i=1; i<=sc; i++) {
        let dist = getVal(`socket_circuit_${i}_panel_dist`);
        document.querySelectorAll(`input.extra-dist-input[data-circuit="socket-${i}"]`).forEach(inp => dist += (parseFloat(inp.value)||0)/100);
        const pts = getInt(`socket_circuit_${i}_points`);
        if(pts > 0) {
            if(st==='surface_vaf') { addQty('1.3', dist); addQty('3.1', pts); } 
            else {
                addQty('1.1', dist); 
                if(st.includes('_pvc')) {
                    addQty(st.includes('concealed')?'2.3':'2.1', dist);
                    addQty(st.includes('concealed')?'3.2':'3.1', pts);
                    if(!st.includes('trunking')) addQty('13.1', pts * 2);
                } else if(st.includes('_emt')) {
                    addQty('2.2', dist); addQty('3.1', pts); addQty('13.2', pts * 2);
                }
                if(st.includes('trunking')) addQty('14.1', dist);
            }
        }
    }

    // 4. Lights
    const lc = getInt('light_circuits');
    const lt = document.getElementById('light_type')?.value;
    const ft = document.getElementById('fixture_type_1')?.value;
    for(let i=1; i<=lc; i++) {
        let dist = getVal(`light_circuit_${i}_dist_panel_to_switch`) + getVal(`light_circuit_${i}_dist_switch_to_light`);
        document.querySelectorAll(`input.extra-dist-input[data-circuit="light-${i}"]`).forEach(inp => dist += (parseFloat(inp.value)||0));
        const pts = getInt(`light_circuit_${i}_points`);
        if(pts > 0) {
            addQty('1.2', dist);
            if(lt.includes('_pvc')) {
                addQty(lt.includes('concealed')?'2.3':'2.1', dist);
                if(!lt.includes('trunking')) addQty('13.1', pts * 2);
            } else if(lt.includes('_emt')) {
                addQty('2.2', dist); addQty('13.2', pts * 2);
            } else if(lt.includes('trunking')) addQty('14.1', dist);
            
            if(ft==='LED_E27') addQty('4.1', pts); 
            else if(ft==='LED_PANEL') addQty('15.1', pts); 
            else if(ft==='T8_SET') addQty('15.2', pts);
        }
    }

    // 5. AC/Heater (Logic: ใช้ค่าจาก Dropdown หรือ Auto)
    ['ac_wiring', 'heater_wiring'].forEach(prefix => {
        const count = getInt(`${prefix}_units`);
        const installType = document.getElementById(prefix==='ac_wiring'?'ac_install_type_4':'wh_install_type_5')?.value;
        for(let i=1; i<=count; i++) {
            const dist = getVal(`${prefix}_${i}_panel_to_breaker_dist`) + getVal(`${prefix}_${i}_breaker_to_unit_dist`);
            const ground = getVal(`${prefix}_${i}_panel_to_unit_dist_ground`);
            
            if(dist > 0 || ground > 0) {
                addQty('1.4', dist); addQty('1.5', ground);
                if(dist > 0) {
                    if(installType.includes('_pvc')) {
                        addQty(installType.includes('concealed')?'2.3':'2.1', dist);
                        if(!installType.includes('trunking')) addQty('13.1', 2);
                    } else if(installType.includes('_emt')) {
                        addQty('2.2', dist); addQty('13.2', 2);
                    } else if(installType.includes('trunking')) addQty('14.1', dist);
                }
                addQty('12.1', 1); // กล่องเบรกเกอร์

                // อ่านค่า Breaker
                const breakerSelect = document.getElementById(`${prefix}_${i}_breaker_select`);
                const infoDiv = document.getElementById(`${prefix}_${i}_breaker_info`);
                let amps = 0;

                if (breakerSelect) {
                    if (breakerSelect.value === 'auto' && infoDiv) {
                        amps = parseInt(infoDiv.dataset.autoAmp || 0);
                    } else {
                        amps = parseInt(breakerSelect.value || 0);
                    }
                }

                // เพิ่มเบรกเกอร์ตามขนาดที่ได้
                if(amps > 0) {
                    if(amps <= 16) addQty('10.1', 1);
                    else if(amps <= 20) addQty('10.2', 1);
                    else if(amps <= 32) addQty('10.3', 1);
                }
            }
        }
    });

    // Others
    addQty('11.1', getInt('lan_points')); addQty('11.2', getVal('lan_distance'));
    addQty('11.3', getInt('tv_points')); addQty('11.4', getVal('tv_distance'));
    addQty('11.5', getInt('cctv_points'));
    addQty('7.1', getInt('heater_units')); addQty('5.1', getInt('ac_units'));
    addQty('5.3', getInt('pump_units')); addQty('5.4', getInt('fan_units'));
    const pt = document.getElementById('wp_install_type_6')?.value;
    if(pt === 'vct_clip') addQty('16.1', 15 * getInt('pump_units'));
    else if(pt === 'nyy_burial') { addQty('16.2', 15 * getInt('pump_units')); addQty('2.1', 15 * getInt('pump_units')); }

    if(document.getElementById('service_inspection')?.checked) addQty('8.1', 1);
    if(document.getElementById('service_leak_find')?.checked) addQty('8.2', 1);
    if(document.getElementById('service_trip_find')?.checked) addQty('8.3', 1);
    addQty('8.4', getInt('service_lamp_replace'));

    if(document.getElementById('toggle_ev_charger_visibility')?.checked && getVal('ev_cable_dist_8') > 0) {
        addQty('18.1', 1);
        if(document.getElementById('ev_install_type_8').value === 'new_meter_tou') addQty('18.2', 1);
        const evCost = getVal('ev_charger_cost_8');
        if(evCost > 0) setPrice('M-EV-CHARGER-7KW', evCost);
    }

    addQty('19.1', getInt('demo_lights_9')); addQty('19.2', getInt('demo_outlets_9'));
    addQty('19.3', getInt('demo_cables_9')); addQty('19.4', getInt('demo_ac_9'));
    if(document.getElementById('demo_include_repair_9')?.checked) addQty('19.5', getInt('demo_lights_9') + getInt('demo_outlets_9'));

    return quantities;
}

function performCalculation() {
    const settings = {
        qualityMultiplier: parseFloat(document.getElementById('material_quality').value) || 1.0,
        wastageFactor: (parseFloat(document.getElementById('wastage_factor').value) || 0) / 100,
        overheadFactor: (parseFloat(document.getElementById('overhead_factor').value) || 0) / 100,
        profitFactor: (parseFloat(document.getElementById('profit_factor').value) || 0) / 100,
        province: document.getElementById('province_selector').value,
        bkkZone: document.getElementById('bkk_zone_selector').value,
        includeVat: document.getElementById('include_vat').checked,
        minCharge: parseFloat(document.getElementById('min_charge').value) || 0,
        cableSpecConfig: {
            mainType: document.getElementById('main_ext_type_7').value,
            selectedSize: document.getElementById('main_cable_size_7').value 
        }
    };
    return calculateProjectCost(buildQuantitiesFromDOM(), settings, manualPOItems, manualBOQItems);
}

function updateRealtimeTotal() {
    const costs = performCalculation();
    const totalEl = document.getElementById('total-display');
    if(totalEl) totalEl.textContent = `฿${formatCurrency(costs.totalWithVat)}`;
}

function displayReport() {
    const costs = performCalculation();
    const output = document.getElementById('output-section');
    if(output) {
        output.classList.remove('hidden');
        output.scrollIntoView({behavior:'smooth'});
        document.getElementById('report-content').innerHTML = generateReport(costs, activeTab).html;
    }
}

function setupExportButtons() {
    document.getElementById('save-pdf-btn')?.addEventListener('click', async () => {
        const btn = document.getElementById('save-pdf-btn');
        btn.innerText = "Creating..."; btn.disabled = true;
        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            const el = document.getElementById('output-section');
            el.querySelectorAll('.no-print').forEach(e => e.style.display = 'none');
            await doc.html(el, { callback: (doc) => { doc.save('quotation.pdf'); el.querySelectorAll('.no-print').forEach(e => e.style.display = ''); btn.innerText = "PDF"; btn.disabled = false; }, x: 10, y: 10, width: 190, windowWidth: 1024 });
        } catch(e) { console.error(e); btn.innerText = "Error"; btn.disabled = false; }
    });
    document.getElementById('save-image-btn')?.addEventListener('click', () => {
        const el = document.getElementById('output-section');
        el.querySelectorAll('.no-print').forEach(e => e.style.display = 'none');
        html2canvas(el).then(canvas => {
            const link = document.createElement('a'); link.download = 'quotation.png'; link.href = canvas.toDataURL(); link.click();
            el.querySelectorAll('.no-print').forEach(e => e.style.display = '');
        });
    });
}

function setupManualJobListeners() {
    const addRowBtn = document.getElementById('manual-job-add-material-row');
    if(addRowBtn) {
        addRowBtn.addEventListener('click', () => {
            const tbody = document.querySelector('#manual-job-materials-table tbody');
            const row = document.createElement('tr');
            row.innerHTML = `<td><input class="form-input w-full manual-mat-desc" placeholder="รายการ"></td><td><input type="number" class="form-input w-full manual-mat-qty" placeholder="0"></td><td><input class="form-input w-full manual-mat-unit" placeholder="หน่วย"></td><td><input type="number" class="form-input w-full manual-mat-price" placeholder="0.00"></td><td><button class="btn-delete-row" onclick="this.closest('tr').remove()">×</button></td>`;
            tbody.appendChild(row);
        });
    }
    const addBtn = document.getElementById('manual-job-add-btn');
    if(addBtn) {
        addBtn.addEventListener('click', () => {
            const name = document.getElementById('manual-job-name').value;
            const labor = parseFloat(document.getElementById('manual-job-labor-total').value) || 0;
            const qty = parseFloat(document.getElementById('manual-job-qty').value) || 1;
            if(!name) return alert('ระบุชื่องาน');
            
            document.querySelectorAll('#manual-job-materials-table tbody tr').forEach((row, idx) => {
                const desc = row.querySelector('.manual-mat-desc').value;
                const q = parseFloat(row.querySelector('.manual-mat-qty').value)||0;
                const u = row.querySelector('.manual-mat-unit').value;
                const p = parseFloat(row.querySelector('.manual-mat-price').value)||0;
                if(desc && q>0) manualPOItems.push({id:`MAN_${Date.now()}_${idx}`, description:desc, quantity:q, unit:u, unit_price:p, spec:`(งาน: ${name})`});
            });
            
            let matCost = 0;
            document.querySelectorAll('#manual-job-materials-table tbody tr').forEach(row => matCost += (parseFloat(row.querySelector('.manual-mat-qty').value)||0)*(parseFloat(row.querySelector('.manual-mat-price').value)||0));
            
            manualBOQItems.push({description:name, quantity:qty, unit:document.getElementById('manual-job-unit').value||'งาน', material_unit_cost:matCost/qty, labor_unit_cost:labor/qty});
            
            document.getElementById('manual-job-name').value = '';
            document.querySelector('#manual-job-materials-table tbody').innerHTML = '';
            updateRealtimeTotal();
            alert('เพิ่มงานแล้ว');
        });
    }
}

function setupTabListeners() {
    document.querySelectorAll('.tab-btn').forEach(b => b.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('tab-active'));
        e.target.classList.add('tab-active');
        activeTab = e.target.dataset.tab;
        displayReport();
    }));
}

function populatePriceEditor() {
    const tbody = document.getElementById('price-editor-body');
    if(!tbody) return;
    const prices = getPriceList();
    let html = '';
    for(const [id, p] of Object.entries(prices)) {
        if(p > 0) html += `<tr class="border-b"><td class="p-2 text-xs font-mono">${id}</td><td class="p-2"><input type="number" class="form-input w-24 p-1 text-right text-sm" value="${p}" onchange="import('./modules/calculator.js').then(m=>{m.setPrice('${id}',parseFloat(this.value)); document.dispatchEvent(new Event('change'));})"></td></tr>`;
    }
    tbody.innerHTML = html;
}

function setupCollapsibleCards() {
    document.querySelectorAll('.collapsible-card h3').forEach(h => h.addEventListener('click', () => h.parentElement.classList.toggle('open')));
}
