
class InputTime {
    constructor(idSelector) {
        this.idSelector = document.getElementById(idSelector);
        this.inputSelector = '#' + idSelector + ' input[type=text]';
        this.input = document.querySelectorAll(this.inputSelector);

        this.idSelector.addEventListener('keyup', (e)=>{
            let val = e.target.value;
            let del = this.isDeleteKey(e.key);
            if(val.length==2 && e.key==':') { 
                let val0=val[0];
                val=val.replace(val[0], 0);
                val=val.replace(val[1], val0);
            }
            if(val.length==2 && !del) { val = val + ':'; }
            if(val.length==2 && del) { val = val.substr(0, val.length-1); }
            if(val.length>2) {
                if (val[2]!=':') { val=val.substr(0,2) + ':' + val.substr(3,val.length-1);}
                val = val.replace(val[2], '9'); 
            }
            val = val.replace(' ', 'x');
            val = this.controlNumber(val);
            if(val.length>2) { val = val.replace(val[2], ':'); }
            if(val.length>5) { val = val.substr(0, 5); }
            e.target.value = val;
        });
        
        this.input.forEach(element=>{
            element.addEventListener('blur', (e)=>{
                let val = e.target.value;
                if (val.length<5) { val = this.autoComplet(val); }
                val = this.rangeTime(val);
                e.target.value = val;
            });
        });
    }

    isDeleteKey (key) {
        if (key == 'Backspace' || key == 'Delete') { return true; }
        return false;
    }
    
    controlNumber (val) {
        if(isNaN(val)) { 
            val = val.substr(0, val.length-1);
            val = this.controlNumber(val);
        }
        return val;
    }

    autoComplet (val) {
        if (val.length==1) { val = '0' + val; }
        if (val.length==2) { val = val + ':'; }
        if (val.length==3) { val = val + '0'; }
        if (val.length==4) { val = val + '0'; }
        return val;
    }
    
    rangeTime(val) {
        let tab = val.split(':');
        if (tab[0]>23 || tab[1]>59) { 
            val =  'Nie ma takiej godziny  ' + val; 
            this.bulletin(val);
            val = '';
        } else {
            this.removbulletim();
        }
        return val;
    }

    bulletin(val) {
        if (document.querySelector('.allertTime')) {
            const allert = document.querySelector('.allertTime');
            allert.innerHTML= val;
        } else {
            const allert = document.createElement('div');
            allert.classList.add('allertTime');
            allert.innerHTML= val;
            this.idSelector.appendChild(allert);
        }
    }
    removbulletim(){
        if (document.querySelector('.allertTime')) {
            const allert = document.querySelector('.allertTime');
            allert.remove();
        }
    }
    

}

