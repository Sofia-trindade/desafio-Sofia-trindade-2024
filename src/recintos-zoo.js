class RecintosZoo {

    constructor() {

        // Definindo os recintos do zoológico com número, bioma, tamanho total e os animais já presentes
        this.recintos = [

            {numero: 1, bioma: 'savana', tamanho: 10, animais: [{especie: 'MACACO', quantidade: 3}] },
            {numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            {numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{especie: 'GAZELA', quantidade: 1}] },
            {numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            {numero: 5, bioma: 'savana', tamanho: 9, animais: [{especie: 'LEAO', quantidade: 1}] },

        ];

        // Definindo as espécies de animais, seu tamanho, biomas onde vivem e se são carnívoros
        this.animais = {
            'LEAO': {tamanho: 3, bioma: ['savana'], carnivoro: true},
            'LEOPARDO': {tamanho: 2, bioma: ['savana'], carnivoro: true},
            'CROCODILO': {tamanho: 3, bioma: ['rio'], carnivoro: true},
            'MACACO': {tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false},
            'GAZELA': {tamanho: 2, bioma: ['savana'], carnivoro: false},
            'HIPOPOTAMO': {tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false}
        };
        
    };

    // Método para analisar os recintos viáveis para um determinado tipo e quantidade de animais
    analisaRecintos(especie, quantidade) {
         // Verifica se a espécie informada é válida (existe na lista de animais)
        if(!this.animais[especie]){
            return{ erro: 'Animal inválido'}; // Retorna erro se a espécie for inválida
        }

        // Verifica se a quantidade é válida (deve ser maior que zero)
        if (quantidade <= 0) {
            return { erro: 'Quantidade inválida' };  // Retorna erro se a quantidade for inválida
        }

        // Recupera as informações da espécie do animal
        const animalInfo = this.animais[especie];

        // Calcula o espaço necessário para acomodar todos os animais da espécie (tamanho individual * quantidade)
        const tamanhoNecessario = animalInfo.tamanho * quantidade;

        // Lista para armazenar os recintos viáveis
        let recintosViaveis = [];

        // Loop para verificar todos os recintos
        for (let recinto of this.recintos) {
            // Verifica se o bioma do recinto é compatível com o bioma da espécie
            if (!animalInfo.bioma.includes(recinto.bioma)) {
                continue; // Se o bioma não for compatível, passa para o próximo recinto
            }
        

            // Calcula o espaço total já ocupado pelos animais no recinto
            let espacoOcupado = recinto.animais.reduce((total, animal) => {
                const infoAnimal = this.animais[animal.especie]; // Pega as informações de cada animal no recinto
                return total + (infoAnimal.tamanho * animal.quantidade); // Soma o espaço que os animais ocupam
            }, 0);

            // Adicionar espaço extra se houver mais de uma espécie
            if (recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === especie)) {
                espacoOcupado += 1;
            }


            // Calcula o espaço restante no recinto
            const espacoRestante = recinto.tamanho - espacoOcupado;
          
            // Verifica se o espaço restante é suficiente para acomodar os novos animais
            if (espacoRestante >= tamanhoNecessario) {
                
                // Adiciona o recinto viável à lista de recintos viáveis, junto com o espaço livre e total
                recintosViaveis.push({
                  numero: recinto.numero,
                  espacoLivre: espacoRestante - tamanhoNecessario,
                  total: recinto.tamanho
                });
            }
        }

        // Se nenhum recinto viável foi encontrado, retorna um erro
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável' };
        }

         // Ordenar os recintos viáveis por número
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        // Retorna a lista de recintos viáveis, formatada com o número do recinto, espaço livre e total
        return {
            recintosViaveis: recintosViaveis.map(r => `Recinto ${r.numero} (espaço livre: ${r.espacoLivre} total: ${r.total})`)
        };
    }


}


export { RecintosZoo as RecintosZoo };

