
const URL = "./my_model/";
let model, labelContainer, maxPredictions;

// Elementos da UI
const uploadArea = document.getElementById("upload-area");
const fileInput = document.getElementById("imageUpload");
const button = uploadArea.querySelector(".btn");
const loadingElement = document.getElementById("loading");
const imagePreview = document.getElementById("image-preview");
const resultsSection = document.getElementById("results");

// Event listeners para upload
uploadArea.addEventListener("click", () => fileInput.click());
button.addEventListener("click", (e) => {
    e.stopPropagation();
    fileInput.click();
});

// Drag and drop funcionality
uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#4fc3dc";
    uploadArea.style.backgroundColor = "rgba(79, 195, 220, 0.2)";
});

uploadArea.addEventListener("dragleave", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#ccc";
    uploadArea.style.backgroundColor = "transparent";
});

uploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = "#ccc";
    uploadArea.style.backgroundColor = "transparent";
    
    if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleFileSelect(e.dataTransfer.files[0]);
    }
});

async function loadModel() {
    try {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        labelContainer = document.getElementById("label-container");
        console.log("Modelo carregado com sucesso!");
    } catch (error) {
        console.error("Erro ao carregar o modelo:", error);
        alert("Não foi possível carregar o modelo. Verifique o console para mais detalhes.");
    }
}

function handleFileSelect(file) {
    if (!file || !file.type.match('image.*')) {
        alert("Por favor, selecione uma imagem válida.");
        return;
    }
    
    // Mostrar loading
    loadingElement.style.display = "block";
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById("uploadedImage");
        img.src = e.target.result;
        
        // Mostrar preview
        imagePreview.style.display = "block";
        
        img.onload = () => {
            predict(img);
            loadingElement.style.display = "none";
            resultsSection.style.display = "block";
        };
    };
    reader.readAsDataURL(file);
}

fileInput.addEventListener("change", function(event) {
    if (event.target.files[0]) {
        handleFileSelect(event.target.files[0]);
    }
});

async function predict(imageElement) {
    try {
        // Fazer predição
        const prediction = await model.predict(imageElement);
        
        // Limpar container anterior
        labelContainer.innerHTML = "";
        
        // Ordenar previsões do maior para o menor
        prediction.sort((a, b) => b.probability - a.probability);
        
        // Criar barras de progresso para cada classe
        prediction.forEach(p => {
            const percentage = (p.probability * 100).toFixed(1);
            
            const predictionBar = document.createElement("div");
            predictionBar.className = "prediction-bar";
            
            const label = document.createElement("div");
            label.className = "prediction-label";
            label.textContent = p.className;
            
            const progressContainer = document.createElement("div");
            progressContainer.className = "prediction-progress";
            
            const progressFill = document.createElement("div");
            progressFill.className = "prediction-fill";
            progressFill.style.width = percentage + "%";
            
            const value = document.createElement("div");
            value.className = "prediction-value";
            value.textContent = percentage + "%";
            
            progressContainer.appendChild(progressFill);
            predictionBar.appendChild(label);
            predictionBar.appendChild(progressContainer);
            predictionBar.appendChild(value);
            
            labelContainer.appendChild(predictionBar);
        });
    } catch (error) {
        console.error("Erro na predição:", error);
        labelContainer.innerHTML = "<p>Ocorreu um erro ao processar a imagem. Tente novamente.</p>";
        loadingElement.style.display = "none";
    }
}

// Carregar modelo quando a página carregar
window.addEventListener('DOMContentLoaded', loadModel);