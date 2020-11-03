var FieldType;
(function (FieldType) {
    FieldType[FieldType["poleTekstowe"] = 0] = "poleTekstowe";
    FieldType[FieldType["poleWielolinijkowe"] = 1] = "poleWielolinijkowe";
    FieldType[FieldType["data"] = 2] = "data";
    FieldType[FieldType["email"] = 3] = "email";
})(FieldType || (FieldType = {}));
class FieldLabel {
    constructor(label) {
        return '<label>' + label + '</label>';
    }
}
class InputField {
    constructor() {
        this.name = "text";
        this.label = "poleTekstowe";
        this.type = FieldType.poleTekstowe;
        this.render = function () {
            let myContainer = '<label>' + this.label + '</label>' + ' <input type="text" id="inputField">';
            return myContainer;
        };
    }
}
class TextAreaField {
    constructor() {
        this.name = "pwl";
        this.label = "poleWielolinijkowe";
        this.type = FieldType.poleWielolinijkowe;
        this.render = function () {
            let myContainer = '<label>' + this.label + '</label>' + '<textarea id="pwl"></textarea>';
            return myContainer;
        };
    }
}
class DateField {
    constructor() {
        this.name = "data";
        this.label = "data";
        this.type = FieldType.data;
        this.render = function () {
            let myContainer = '<label>' + this.label + '</label>' + '<input type="date" id="dateField" >';
            return myContainer;
        };
    }
}
class EmailField {
    constructor() {
        this.name = "email";
        this.label = "email";
        this.type = FieldType.email;
        this.render = function () {
            let myContainer = '<label>' + this.label + '</label>' + '<input type="email" id="email" >';
            return myContainer;
        };
    }
}
class Form {
    constructor() {
        this.arr = [new EmailField().render(), new DateField().render(), new TextAreaField().render(), new InputField().render()];
        this.getValue = function () {
            let inputfieldValue = document.getElementById("inputField").value;
            let textAreaValue = document.getElementById("pwl").value;
            let dateFieldValue = document.getElementById("dateField").value;
            let emailValue = document.getElementById("email").value;
            return {
                inputfieldValue,
                textAreaValue,
                emailValue,
                dateFieldValue
            };
        };
        this.innerHTML = new EmailField().render() + '<br>' + new DateField().render() + '<br>' + new TextAreaField().render() + '<br>' + new InputField().render() + '<br><button id="saveLS">Zapisz formularz</button><button id="return">Wstecz</button>';
        this.render = function () {
            let myContainer = document.getElementById("form_place").innerHTML = this.innerHTML;
            let saveLS = document.getElementById("saveLS");
            saveLS.addEventListener("click", () => {
                local.saveDoc();
                window.location.href = '../src/index.html';
            });
            let back = document.getElementById("return");
            back.addEventListener("click", () => {
                window.history.back();
            });
        };
    }
}
class App {
    constructor() {
        this.form = new Form();
        this.renderNewForm = function () {
            let form = new Form().render();
        };
        this.getValueEvent = function () {
            this.value = new Form().getValue();
            return this.value;
        };
        this.viewFormData = () => {
            let formData = this.getValueEvent();
            let newDiv = document.createElement('div');
            newDiv.innerHTML = "<br>E-mail: " + formData.emailValue + "<br>Data: " + formData.dateFieldValue + "<br>Pole Wielolinijkowe: " + formData.textAreaValue + "<br>Pole tekstowe: " + formData.inputfieldValue;
            document.body.appendChild(newDiv);
        };
        this.start = function () {
            var newForm = document.getElementById('newForm');
            if (typeof (newForm) != 'undefined' && newForm != null) {
                newForm.addEventListener("click", this.renderNewForm);
            }
            var getValueBtn = document.getElementById('getValueBtn');
            if (typeof (getValueBtn) != 'undefined' && getValueBtn != null) {
                getValueBtn.addEventListener("click", this.getValueEvent);
            }
            var viewFormValue = document.getElementById('viewFormValue');
            if (typeof (viewFormValue) != 'undefined' && getValueBtn != null) {
                viewFormValue.addEventListener("click", this.viewFormData);
            }
            var docList = document.getElementById('docList');
            if (typeof (docList) != 'undefined' && docList != null) {
                docList.addEventListener("click", () => {
                    doc.render();
                    app.start();
                });
            }
            var back = document.getElementById('return');
            if (typeof (back) != 'undefined' && back != null) {
                back.addEventListener("click", () => {
                    window.history.back();
                });
            }
            var remove = document.getElementsByClassName('remove');
            for (let i = 0; i < remove.length; i++) {
                let j = i;
                j = document.getElementById(remove[i].id);
                j.addEventListener("click", () => {
                    let el = document.getElementById(remove[i].id).id;
                    local.removeDocument(el);
                    window.location.reload();
                });
            }
            var load = document.getElementById('load');
            if (typeof (load) != 'undefined' && load != null) {
                load.addEventListener("click", () => {
                    let df = new DateField();
                    app.renderNewForm();
                    let parm = router.getParam();
                    let prams = local.loadDocument(parm);
                    let email = document.getElementById('email');
                    email.value = prams.emailValue;
                    let dateField = document.getElementById('dateField');
                    dateField.value = prams.dateFieldValue;
                    let pwl = document.getElementById('pwl');
                    pwl.value = prams.textAreaValue;
                    let inputField = document.getElementById('inputField');
                    inputField.value = prams.inputfieldValue;
                });
            }
        };
    }
}
class LocalStorage {
    constructor() {
        this.saveDoc = () => {
            let paramCheck = router.getParam();
            let id;
            if (paramCheck == null) {
                id = this.saveDocument();
            }
            else {
                id = paramCheck;
            }
            let formObj = app.getValueEvent();
            localStorage.setItem(id, JSON.stringify(formObj));
        };
        this.getDocumentKey = () => {
            let allDoc = Object.keys(localStorage);
            return allDoc;
        };
    }
    saveDocument() {
        let docID = Date.now().toString();
        return docID;
    }
    loadDocument(string) {
        const getDocument = localStorage.getItem(string);
        return JSON.parse(getDocument);
    }
    getDocuments() {
        let allDoc = Object(localStorage);
        return allDoc;
    }
    removeDocument(id) {
        localStorage.removeItem(id);
    }
}
class DocumentList {
    constructor() {
        this.render = () => {
            this.getDocumentList();
            if (this.allDocTab.length > 0) {
                let lilist = '';
                this.allDocTab.forEach(item => {
                    lilist += '<li><a href="edit-document.html?id=' + item + '">' + item + '</a><button class="remove" style="margin-left: 15px;" id="' + item + '">Usuń</button></li>';
                });
                let htmllist = '<ul>' + lilist + '</ul>';
                let myContainer = document.getElementById("docList_Place").innerHTML = htmllist;
                return myContainer;
            }
            else {
                let htmllist = 'Brak zapisanych formularzy';
                let myContainer = document.getElementById("docList_Place").innerHTML = htmllist;
                return myContainer;
            }
        };
    }
    getDocumentList() {
        let getID = new LocalStorage;
        this.allDocTab = getID.getDocumentKey();
    }
}
class Router {
    getParam() {
        const query = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        const getID = urlParams.get('id');
        return getID;
    }
}
let local = new LocalStorage();
let doc = new DocumentList();
let app = new App();
app.start();
let router = new Router();
//# sourceMappingURL=index.js.map