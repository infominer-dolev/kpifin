<template>
    <input type="file" @change="handleFileChange"><br>
    <text> rows {{ import_file }}</text>
    <div v-if="uploadFile==0"> אנא בחר קבצים להעלאה </div>
    <div v-if="uploadFile==1"> הקבצים בטעינה </div>
    <div v-if="uploadFile==2"> הסתיימה טעינת הקבצים</div>

    <br>
</template>

<script>
import axios from "axios";
import storeManager from "@/storeManager";

export default {
    data() {
        return {
        }
    },
    props: {
        import_file: {
            type: String,
            required: true
        }
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.readFile(file);
            }
        },
        readFile(file) {
            const reader = new FileReader();
            reader.onload = () => {
                const csvData = reader.result;
                const decoder = new TextDecoder('windows-1255');
                const utf8Content = decoder.decode(new Uint8Array(csvData));
                this.parseCSV(utf8Content);
              
            };
            reader.readAsArrayBuffer(file);
        },
        parseCSV(csvData) {
            debugger
            if (this.import_file === 'Hasifa') {
                const jsonData = storeManager.parseHasifotFromCsv(csvData);
                storeManager.storeHasifot(this,jsonData);
                this.UploadDB(jsonData, 'insertHasifot');
                this.uploadFile+=1;
                console.log(jsonData);
            } else {
                if (this.import_file === 'History') {
                    const jsonData = storeManager.parseYieldsFromCsv(csvData);
                    storeManager.storeYields(this,jsonData);
                    this.UploadDB(jsonData, 'insertYields');
                    this.uploadFile+=1;
                    console.log(jsonData);
                }
            }

        },
        async UploadDB(json, place) {
            const result = await axios.post(`http://localhost:58822/rstsrv/${place}/transaction`, {list: json});
            console.log(result);
        },
    },
}
</script>

<style></style>
