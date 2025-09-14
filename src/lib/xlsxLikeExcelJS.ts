import ExcelJS from 'exceljs';

// Adapter implementing the minimal XLSX-like surface used by xlsxSample.ts
// It allows us to avoid the vulnerable 'xlsx' dependency while keeping the
// same call sites and data flow.

type AOA = any[][];

type AoaSheet = { __aoa: AOA };

export type ExcelJSXlsxLike = {
  utils: {
    book_new: () => ExcelJS.Workbook;
    aoa_to_sheet: (data: AOA) => AoaSheet;
    book_append_sheet: (wb: ExcelJS.Workbook, ws: AoaSheet, name: string) => void;
  };
  writeFile: (wb: ExcelJS.Workbook, file: string) => Promise<void>;
  writeFileXLSX?: (wb: ExcelJS.Workbook, file: string) => Promise<void>;
};

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

async function downloadBlob(data: BlobPart, filename: string, type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
  const blob = new Blob([data], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function makeExcelJSAdapter(): ExcelJSXlsxLike {
  return {
    utils: {
      book_new() {
        const wb = new ExcelJS.Workbook();
        return wb;
      },
      aoa_to_sheet(data: AOA): AoaSheet {
        return { __aoa: data };
      },
      book_append_sheet(wb: ExcelJS.Workbook, ws: AoaSheet, name: string) {
        const wsNew = wb.addWorksheet(name);
        // Expect ws.__aoa to be [ [headers...], ...rows ]
        if (ws && Array.isArray((ws as any).__aoa)) {
          wsNew.addRows((ws as any).__aoa as AOA);
        } else if (Array.isArray((ws as any))) {
          wsNew.addRows((ws as any) as AOA);
        }
      },
    },
    async writeFile(wb: ExcelJS.Workbook, file: string) {
      if (isBrowser()) {
        const buf = await wb.xlsx.writeBuffer();
        await downloadBlob(buf, file);
        return;
      }
      // Node.js fallback
      // exceljs provides writeFile in Node environment
      // @ts-ignore - typings have xlsx namespace
      await wb.xlsx.writeFile(file);
    },
    async writeFileXLSX(wb: ExcelJS.Workbook, file: string) {
      // Alias to writeFile for compatibility with our consumer code
      return (async () => this.writeFile(wb, file)).call({ writeFile: this.writeFile });
    },
  };
}

// Convenience: build a default adapter instance
export const ExcelJSXLSX = makeExcelJSAdapter();

