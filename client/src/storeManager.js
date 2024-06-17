import * as Papa from 'papaparse';
const storeManager=
{
    storeHasifot(context,data){
        context.$store.state.count = data.length;
        context.$store.state.hasiDB = data;

    },
  
    storeYields(context,data){
        context.$store.state.hist_count = data.length;
        context.$store.state.historyDB = data;
    },
    parseHasifotFromCsv(csvData){
        const lines=Papa.parse(csvData).data;
        debugger
        const jsonData=[];
        debugger
         for (let i = 1; i < lines.length; i++) {
            let values = lines[i];
            if(values.length===1)
                continue;
  
             jsonData.push({
                PROD_ID: values[0],
                SUG: values[1],
                ID: values[2],
                SUG_MUZAR: values[3],
                SHM_MUZAR: values[4],
                MISPAR_HEVRA: values[5],
                SHM_HEVRA: values[6],
                YITRAT_NEHASIM: values[7],
                MENAYOT: values[8],
                AGAH_CONC: values[9],
                AGAH_MMSL: values[10],
                HALVAAOT_LS: values[11],
                KRANOT_LS: values[12],
                AHER: values[13],
                MEZUMAN_PIKDONOT: values[14],
                MATAH: values[15],
                HUL: values[16]
            })
        }
        return jsonData;
    }, 
    parseYieldsFromCsv(csvData){
        const lines=Papa.parse(csvData).data;
        const jsonData=[];
        for (let i = 1; i < lines.length; i++) {
            let values = lines[i];
            if(values.length===1)
                continue;
            jsonData.push({
                PROD_ID: values[0],
                DATE: values[6],
                YIELD: values[7],
                STD_12: values[8],
                STD_36: values[9],
                STD_60: values[10]
            })
        }
        return jsonData;
    },
}
export default storeManager;