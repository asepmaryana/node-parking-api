'use strict';

const excel = require('exceljs')
const dao = require('../repository/reportRepository');
const moment = require('moment');

module.exports = {
    getDaily: (req, res) => {
        let criteria = { date: req.params.date, vehicle_id: req.params.vehicle_id }
        dao.getDaily(req.con, criteria, (err, rows) => {
            let workbook = new excel.Workbook();
            workbook.creator = 'Asep Maryana';
            workbook.created = new Date();

            let worksheet = workbook.addWorksheet('Daily Transaction');
            
            const title = 'LAPORAN TRANSAKSI HARIAN';
            let titleRow = worksheet.addRow([title]);
            titleRow.font = { name: 'Calibri', family: 4, size: 16, underline: 'double', bold: true };

            const subtitle = 'TANGGAL '+req.params.date;
            let subtitleRow = worksheet.addRow([subtitle]);
            subtitleRow.font = { name: 'Calibri', family: 4, size: 10, bold: true };

            worksheet.addRow([]);
            worksheet.addRow(["No", "Plat Nomor", "Jenis", "Check In", "Check Out", "Tarif"]);

            for (var i=0; i<rows.length; i++) {
                var row = rows[i];
                worksheet.addRow([i+1, row.plat_number, row.vehicle, row.checked_in, row.checked_out, row.amount]);
            }
            
            worksheet.mergeCells('A1:F1');
            worksheet.mergeCells('A2:F2');

            worksheet.getCell('A1').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('A2').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('A4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('B4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('C4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('D4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('E4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('F4').alignment = { horizontal:'center', vertical: 'middle'} ;

            worksheet.getColumn(1).width = 7;
            worksheet.getColumn(2).width = 15;
            worksheet.getColumn(3).width = 15;
            worksheet.getColumn(4).width = 20;
            worksheet.getColumn(5).width = 20;
            worksheet.getColumn(6).width = 15;

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Daily.xlsx");
            workbook.xlsx.write(res)
            .then((data) => {
                res.end();
            });
        })
    },
    getRecapitulation: (req, res) => {
        let criteria = { from: req.params.from, to: req.params.to }
        dao.getRecapitulation(req.con, criteria, (err, rows) => {
            let result = {
                bike_count: 0,
                bike_total: 0,
                car_count: 0,
                car_total: 0,
                total: 0,
                rows: rows
            }
            for (var i=0; i<rows.length; i++) {
                result.bike_count += rows[i].bike_checkout_count;
                result.car_count += rows[i].car_checkout_count;
                result.bike_total += rows[i].bike_trx_sum;
                result.car_total += rows[i].car_trx_sum;
                rows[i].trx_sum = rows[i].bike_trx_sum + rows[i].car_trx_sum;
                result.total += rows[i].trx_sum;
            }

            let workbook = new excel.Workbook();
            workbook.creator = 'Asep Maryana';
            workbook.created = new Date();

            let worksheet = workbook.addWorksheet('Recap Transaction');
            
            const title = 'LAPORAN REKAPITULASI TRANSAKSI';
            let titleRow = worksheet.addRow([title]);
            titleRow.font = { name: 'Calibri', family: 4, size: 16, underline: 'double', bold: true };

            const subtitle = 'PERIODE '+req.params.from+' sd '+req.params.to;
            let subtitleRow = worksheet.addRow([subtitle]);
            subtitleRow.font = { name: 'Calibri', family: 4, size: 10, bold: true };

            worksheet.addRow([]);
            let header = worksheet.addRow(["No", "Tanggal", "Motor", "", "Mobil", "", "Jumlah"]);
            let subheader = worksheet.addRow(["", "", "Jml Trx", "Nominal Trx", "Jml Trx", "Nominal Trx", ""]);

            for (var i=0; i<result.rows.length; i++) {
                var row = result.rows[i];
                worksheet.addRow([i+1, row.trx_date, row.bike_checkout_count, row.bike_trx_sum, row.car_checkout_count, row.car_trx_sum, row.trx_sum]);
            }
            worksheet.addRow(["", "TOTAL", result.bike_count, result.bike_total, result.car_count, result.car_total, result.total]);

            worksheet.mergeCells('A1:G1');
            worksheet.mergeCells('A2:G2');
            worksheet.mergeCells('A4:A5');
            worksheet.mergeCells('B4:B5');
            worksheet.mergeCells('C4:D4');
            worksheet.mergeCells('E4:F4');
            worksheet.mergeCells('G4:G5');

            worksheet.getCell('A1').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('A2').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('A4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('B4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('C4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('E4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('G4').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('C5').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('D5').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('E5').alignment = { horizontal:'center', vertical: 'middle'} ;
            worksheet.getCell('F5').alignment = { horizontal:'center', vertical: 'middle'} ;

            worksheet.getColumn(1).width = 7;
            worksheet.getColumn(2).width = 20;
            worksheet.getColumn(4).width = 20;
            worksheet.getColumn(6).width = 20;
            worksheet.getColumn(7).width = 20;

            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader("Content-Disposition", "attachment; filename=" + "Recap.xlsx");
            workbook.xlsx.write(res)
            .then((data) => {
                res.end();
            });
        })
    }
}