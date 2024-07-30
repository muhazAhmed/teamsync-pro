import { useCallback } from "react";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import * as XLSX from "xlsx";

type FileType = "csv" | "excel";

const useDownloadFile = <T extends object>() => {
  const downloadFile = useCallback(
    (
      data: T[],
      fileName: string = "data",
      columnNames?: { [K in keyof T]: string },
      fileType: FileType = "csv"
    ) => {
      const formattedData = data.map((row) => {
        const rowData: { [key: string]: any } = {};
        for (const key in row) {
          if (columnNames && columnNames[key as keyof T]) {
            rowData[columnNames[key as keyof T]] = row[key as keyof T];
          } else {
            rowData[key] = row[key as keyof T];
          }
        }
        return rowData;
      });

      if (fileType === "csv") {
        const csv = Papa.unparse(formattedData);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, `${fileName}.csv`);
      } else if (fileType === "excel") {
        const worksheet = XLSX.utils.json_to_sheet(formattedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(blob, `${fileName}.xlsx`);
      }
    },
    []
  );

  return downloadFile;
};

export default useDownloadFile;
