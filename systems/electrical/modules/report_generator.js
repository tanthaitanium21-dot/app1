// modules/report_generator.js
// หน้าที่: รับผลการคำนวณ (costs) แล้วสร้าง HTML Table สำหรับแสดงผลหรือพิมพ์

import { formatCurrency, createSummaryTable } from './ui_renderer.js';

export function generateReport(costs, type) {
    const reportGenerators = {
        'boq-labor': generateLaborBoq,
        'boq-material': generateMaterialBoq,
        'boq-combined': generateCombinedBoq,
        'purchase-order': generatePurchaseOrder
    };
    
    // ถ้าไม่เจอ type ที่ระบุ ให้ใช้ boq-combined เป็นค่าเริ่มต้น
    const generator = reportGenerators[type] || generateCombinedBoq;
    return generator(costs);
}

function generateLaborBoq(costs) {
    let tableRows = costs.labor.filter(item => item.total_price > 0).map((item, index) => `
        <tr class="border-b">
            <td class="px-2 py-2">${index + 1}</td>
            <td class="px-2 py-2">${item.description}</td>
            <td class="px-2 py-2 text-center">${item.quantity.toFixed(0)}</td>
            <td class="px-2 py-2 text-center">${item.unit}</td>
            <td class="px-2 py-2 text-right">${formatCurrency(item.unit_price)}</td>
            <td class="px-2 py-2 text-right">${formatCurrency(item.total_price)}</td>
        </tr>`
    ).join('');
    
    const summary = createSummaryTable([ { label: 'รวมค่าแรง (ปรับปรุงแล้ว)', value: costs.totalLaborCost } ]);
    const html = `
        <h3 class="text-xl font-bold mb-4">BOQ - ค่าแรง</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white text-sm">
                <thead>
                    <tr class="bg-slate-100">
                        <th class="px-2 py-2 text-left">ลำดับ</th>
                        <th class="px-2 py-2 text-left">รายการ</th>
                        <th class="px-2 py-2 text-center">จำนวน</th>
                        <th class="px-2 py-2 text-center">หน่วย</th>
                        <th class="px-2 py-2 text-right">ค่าแรง/หน่วย</th>
                        <th class="px-2 py-2 text-right">รวมค่าแรง</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
        ${summary}`;
    return { html, title: 'BOQ - ค่าแรง' };
}

function generateMaterialBoq(costs) {
     let tableRows = costs.material.filter(item => item.total_price > 0).map((item, index) => `
        <tr class="border-b">
            <td class="px-2 py-2">${index + 1}</td>
            <td class="px-2 py-2">${item.description}</td>
            <td class="px-2 py-2 text-center">${item.quantity.toFixed(0)}</td>
            <td class="px-2 py-2 text-center">${item.unit}</td>
            <td class="px-2 py-2 text-right">${formatCurrency(item.unit_price)}</td>
            <td class="px-2 py-2 text-right">${formatCurrency(item.total_price)}</td>
        </tr>`
    ).join('');
    
    const summary = createSummaryTable([ { label: 'รวมค่าวัสดุ (ปรับปรุงแล้ว)', value: costs.totalMaterialCost } ]);
    const html = `
        <h3 class="text-xl font-bold mb-4">BOQ - ค่าวัสดุ</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white text-sm">
                <thead>
                    <tr class="bg-slate-100">
                        <th class="px-2 py-2 text-left">ลำดับ</th>
                        <th class="px-2 py-2 text-left">รายการ</th>
                        <th class="px-2 py-2 text-center">จำนวน</th>
                        <th class="px-2 py-2 text-center">หน่วย</th>
                        <th class="px-2 py-2 text-right">ค่าวัสดุ/หน่วย</th>
                        <th class="px-2 py-2 text-right">รวมค่าวัสดุ</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
        ${summary}`;
    return { html, title: 'BOQ - ค่าวัสดุ' };
}

function generateCombinedBoq(costs) {
    let tableRows = costs.combined.map((item, index) => {
        const totalUnitPrice = item.material_unit_cost + item.labor_unit_cost;
        const totalRowPrice = totalUnitPrice * item.quantity;
        const materialIdHtml = item.material_id_code
            ? `<br><small class="text-gray-500">(${item.material_id_code})</small>`
            : '';

        return `<tr class="border-b">
                    <td class="px-2 py-2">${index + 1}</td>
                    <td class="px-2 py-2">${item.description}${materialIdHtml}</td>
                    <td class="px-2 py-2 text-center">${(item.quantity).toFixed(0)}</td>
                    <td class="px-2 py-2 text-center">${item.unit}</td>
                    <td class="px-2 py-2 text-right">${formatCurrency(item.material_unit_cost)}</td>
                    <td class="px-2 py-2 text-right">${formatCurrency(item.labor_unit_cost)}</td>
                    <td class="px-2 py-2 text-right font-semibold">${formatCurrency(totalUnitPrice)}</td>
                    <td class="px-2 py-2 text-right font-semibold">${formatCurrency(totalRowPrice)}</td>
                </tr>`;
    }).join('');

    let summaryItems = [
        { label: 'รวมค่าวัสดุ (ปรับปรุงแล้ว)', value: costs.totalMaterialCost },
        { label: 'รวมค่าแรง (ปรับปรุงแล้ว)', value: costs.totalLaborCost },
        { label: `ค่าดำเนินการ (${((costs.overheadAmount / (costs.totalMaterialCost + costs.totalLaborCost)) * 100 || 0).toFixed(0)}%)`, value: costs.overheadAmount },
        { label: `กำไร (${((costs.profitAmount / (costs.totalMaterialCost + costs.totalLaborCost + costs.overheadAmount)) * 100 || 0).toFixed(0)}%)`, value: costs.profitAmount },
    ];

    if (costs.minChargeAdjustment > 0) {
        summaryItems.push({ label: 'ค่าบริการขั้นต่ำ (ปรับเพิ่ม)', value: costs.minChargeAdjustment });
    }

    summaryItems.push({ label: 'รวมทั้งสิ้น (ก่อน VAT)', value: costs.grandTotal });
    if (costs.vatAmount > 0) {
        summaryItems.push({ label: 'ภาษีมูลค่าเพิ่ม 7%', value: costs.vatAmount });
    }
    summaryItems.push({ label: 'รวมสุทธิทั้งโครงการ', value: costs.totalWithVat, isTotal: true });

    const summary = createSummaryTable(summaryItems);
    const html = `
        <h3 class="text-xl font-bold mb-4">BOQ - รวมค่าแรงและวัสดุ</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white text-sm">
                <thead>
                    <tr class="bg-slate-100">
                        <th class="px-2 py-2 text-left">ลำดับ</th>
                        <th class="px-2 py-2 text-left">รายการ</th>
                        <th class="px-2 py-2 text-center">จำนวน</th>
                        <th class="px-2 py-2 text-center">หน่วย</th>
                        <th class="px-2 py-2 text-right">วัสดุ/หน่วย</th>
                        <th class="px-2 py-2 text-right">ค่าแรง/หน่วย</th>
                        <th class="px-2 py-2 text-right">รวม/หน่วย</th>
                        <th class="px-2 py-2 text-right">ราคารวม</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
        ${summary}`;
    return { html, title: 'BOQ - รวมค่าแรงและวัสดุ' };
}

function generatePurchaseOrder(costs) {
    let tableRows = Object.keys(costs.purchaseOrder).sort().map((key, index) => {
        const item = costs.purchaseOrder[key];
        if (item.quantity <= 0) return '';
        const itemTotal = item.quantity * item.unit_price;
        return `<tr class="border-b">
                    <td class="px-2 py-2">${index + 1}</td>
                    <td class="px-2 py-2">${key}</td>
                    <td class="px-2 py-2">${item.description}<br><small class="text-gray-500">${item.spec}</small></td>
                    <td class="px-2 py-2 text-center">${Math.ceil(item.quantity)}</td>
                    <td class="px-2 py-2 text-center">${item.unit}</td>
                    <td class="px-2 py-2 text-right">${formatCurrency(item.unit_price)}</td>
                    <td class="px-2 py-2 text-right">${formatCurrency(itemTotal)}</td>
                </tr>`;
    }).join('');
    
    const totalPO = Object.values(costs.purchaseOrder).reduce((sum, item) => sum + (item.quantity * item.unit_price), 0);
    const summary = createSummaryTable([{ label: 'รวมราคาสินค้า', value: totalPO }]);
    
    const html = `
        <h3 class="text-xl font-bold mb-4">ใบสั่งซื้อวัสดุ</h3>
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white text-sm">
                <thead>
                    <tr class="bg-slate-100">
                        <th class="px-2 py-2 text-left">ลำดับ</th>
                        <th class="px-2 py-2 text-left">รหัส</th>
                        <th class="px-2 py-2 text-left">รายการ</th>
                        <th class="px-2 py-2 text-center">จำนวน</th>
                        <th class="px-2 py-2 text-center">หน่วย</th>
                        <th class="px-2 py-2 text-right">ราคา/หน่วย</th>
                        <th class="px-2 py-2 text-right">ราคารวม</th>
                    </tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
        </div>
        ${summary}`;
    return { html, title: 'ใบสั่งซื้อวัสดุ' };
}