class buscarM {
    constructor() {
        this.fila = 0;
        this.colum = 0;
        this.tablero = [];
        this.recorrer = [[-1, 0], [1, 0], [0, 1], [0,-1],[-1,-1],[-1,1],[1,1],[1,-1]];
        this.pos=[];
        this.texto="";
    }

    cargar(contenido) {
        this.fila = 0;
        this.colum = 0;
        this.tablero = [];
         this.pos=[];
        this.texto="";
        let linea = contenido.trim();
        linea = linea.split('\n');

        for (let i = 0; i < linea.length; i++) {
            if (i == 0) {
                let partes = linea[i].split(" ");
                this.fila = Number(partes[0]);
                this.colum = Number(partes[1]);
            } else {
                let lnueva = linea[i].split(" ")
                lnueva = lnueva.map(Number);
                this.tablero.push(lnueva);
            }
        }
    }

    recorrido(){
        for(let i=0;i<this.fila;i++){
            for(let j=0;j<this.colum;j++){
                this.verificarM(i,j);
            }
        }

        this.pos.forEach(([f,c])=> {
            this.tablero[f][c]='*';
        });

       for (let f=0;f<this.fila;f++){
        for(let c=0;c<this.colum;c++){
            if (typeof this.tablero[f][c]=='number'){
                this.tablero[f][c]=' ';
            }
        }
    }
        let numeros="  ";
        for(let j=0;j<this.colum;j++){
            numeros+=(j+1)+" ";
        }
        this.texto+=numeros+"\n";

        for(let i=0 ;i<this.fila;i++){
            let filaTexto=(i+1)+" ";
            for(let j=0;j<this.colum;j++){
                filaTexto+=this.tablero[i][j]+" ";
            }
            this.texto+=filaTexto+"\n";
        }
        this.texto+=numeros+"\n";

    }

    verificarM(posi,posj){
        let inew=0;
        let jnew=0;
        let prom=0;
        let cont=0;
        let mina=0;
        for(let i=0;i<this.recorrer.length;i++){
            inew=posi+this.recorrer[i][0];
            jnew=posj+this.recorrer[i][1];
            if (inew>=0 && inew<this.fila && jnew>=0 && jnew<this.colum){
                cont++;
                prom+=this.tablero[inew][jnew];
            }
        }
        prom=prom/cont;
        mina=this.tablero[posi][posj]+prom
        if (mina>40.0){
            this.pos.push([posi,posj]);
        }
    }
}
