// modules/calculator.js
// เวอร์ชัน V2.4: รองรับ Logic การคูณวัสดุตามระยะทาง (x3 per meter)

import { bkkZoneMultipliers, provinceMultipliers } from '../data/provinces.js';
import { electricalInstallationData, initialPriceList } from '../data/electrical_data.js';

const allTasks = new Map(), allItems = new Map();
const priceList = JSON.parse(JSON.stringify(initialPriceList));

// Initialize Data Maps
electricalInstallationData.forEach(c => c.tasks.forEach(t => { 
    allTasks.set(t.task_id, t); 
    t.labor_components?.forEach(l => allItems.set(l.labor_id, {desc:t.task_name})); 
    t.material_components?.forEach(m => allItems.set(m.material_id, {desc:m.spec, logic: m.usage_logic})); 
}));

export function getPriceList() { return priceList; }
export function setPrice(id, p) { priceList[id] = p; }
export function getAllItems() { return allItems; }

export function calculateProjectCost(taskQuantities, settings, manualPO=[], manualBOQ=[]) {
    const res = { labor:[], material:[], combined:[], purchaseOrder:{} };
    const { qualityMultiplier=1, wastageFactor=0, overheadFactor=0, profitFactor=0, province='default', bkkZone='BKK_Zone5_Suburban', includeVat=false, minCharge=0, cableSpecConfig } = settings;
    
    let totalMat = 0, totalLab = 0;
    
    for (const [tid, qty] of taskQuantities.entries()) {
        const t = allTasks.get(tid);
        if(!t || qty<=0) continue;
        let tMat = 0, tLab = 0;
        
        t.material_components?.forEach(m => {
            // --- Special Logic: สายเมน ---
            if (tid === '17.5' && cableSpecConfig) {
                // ... (Logic สายเมนคงเดิม) ...
                const { mainType, selectedSize } = cableSpecConfig;
                if(selectedSize) {
                    const targetMatId = `M-CABLE-${mainType}-${selectedSize}`;
                    if(m.material_id.startsWith('M-CABLE') && m.material_id !== targetMatId) return;
                    if(m.material_id === targetMatId) {
                        const p = (priceList[targetMatId]||0) * qualityMultiplier;
                        const q = qty * 2; 
                        tMat += p * q;
                        if(!res.purchaseOrder[targetMatId]) res.purchaseOrder[targetMatId] = { description: `สายเมน ${mainType} ${selectedSize} sq.mm.`, unit:'เมตร', quantity:0, unit_price:p };
                        res.purchaseOrder[targetMatId].quantity += q;
                        
                        const gndId = 'M-WIRE-GND-10SQMM';
                        const gndP = (priceList[gndId]||0) * qualityMultiplier;
                        tMat += gndP * qty;
                         if(!res.purchaseOrder[gndId]) res.purchaseOrder[gndId] = { description: `สายดินเมน THW 10 sq.mm.`, unit:'เมตร', quantity:0, unit_price:gndP };
                        res.purchaseOrder[gndId].quantity += qty;
                    }
                }
            } 
            // --- Standard Logic & Logic "Per Meter" ---
            else {
                const p = (priceList[m.material_id]||0) * qualityMultiplier;
                let matQty = qty;

                // Logic: อ่านค่า usage_logic (เช่น "3 per meter")
                if (m.usage_logic && m.usage_logic.includes('per meter')) {
                    const factor = parseFloat(m.usage_logic.split(' ')[0]);
                    if (!isNaN(factor)) {
                        matQty = qty * factor;
                    }
                }

                // คำนวณราคา
                tMat += p * matQty;
                
                if(!res.purchaseOrder[m.material_id]) res.purchaseOrder[m.material_id] = {
                    description: allItems.get(m.material_id)?.desc || m.material_id, 
                    unit:'หน่วย', quantity:0, unit_price:p
                };
                res.purchaseOrder[m.material_id].quantity += matQty;
            }
        });
        
        t.labor_components?.forEach(l => tLab += (priceList[l.labor_id]||0)*qty);
        
        totalMat += tMat; 
        totalLab += tLab;
        
        res.combined.push({ description: t.task_name, quantity: qty, unit: t.unit_of_measure, material_unit_cost: qty ? tMat/qty : 0, labor_unit_cost: qty ? tLab/qty : 0 });
        res.labor.push({ description: t.task_name, quantity: qty, unit: t.unit_of_measure, unit_price: qty ? tLab/qty : 0, total_price: tLab });
        res.material.push({ description: t.task_name, quantity: qty, unit: t.unit_of_measure, unit_price: qty ? tMat/qty : 0, total_price: tMat });
    }

    // ... (ส่วน Manual Item และ Summary คงเดิม) ...
    manualPO.forEach(po => { const key = po.id || po.description; res.purchaseOrder[key] = { description: po.description, spec: po.spec, unit: po.unit, quantity: po.quantity, unit_price: po.unit_price }; });
    manualBOQ.forEach(i => { const tm = i.material_unit_cost*i.quantity; const tl = i.labor_unit_cost*i.quantity; totalMat+=tm; totalLab+=tl; res.combined.push(i); res.labor.push({...i, unit_price: i.labor_unit_cost, total_price: tl}); res.material.push({...i, unit_price: i.material_unit_cost, total_price: tm}); });
    
    const pMult = (province==='กรุงเทพมหานคร') ? (bkkZoneMultipliers[bkkZone]||bkkZoneMultipliers['BKK_Zone5_Suburban']) : (provinceMultipliers[province]||provinceMultipliers.default);
    totalLab *= pMult.labor; totalMat *= pMult.material;

    res.totalMaterialCost = totalMat * (1 + wastageFactor);
    res.totalLaborCost = totalLab;
    const sub = res.totalMaterialCost + res.totalLaborCost;
    res.overheadAmount = sub * overheadFactor;
    res.profitAmount = (sub + res.overheadAmount) * profitFactor;
    let grandTotal = sub + res.overheadAmount + res.profitAmount;
    
    if(grandTotal > 0 && grandTotal < minCharge) { res.minChargeAdjustment = minCharge - grandTotal; grandTotal = minCharge; } else { res.minChargeAdjustment = 0; }
    res.grandTotal = grandTotal;
    res.vatAmount = includeVat ? res.grandTotal * 0.07 : 0;
    res.totalWithVat = res.grandTotal + res.vatAmount;

    return res;
}
