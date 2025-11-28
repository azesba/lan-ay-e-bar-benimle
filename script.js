document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const initialButtons = document.getElementById('initial-buttons');
    const mainQuestion = document.getElementById('main-question');
    const yesMessage = document.getElementById('yes-message');
    const noMessage = document.getElementById('no-message'); 
    const footerText = document.getElementById('footer-text');
    const container = document.getElementById('container');
    
    // YENİ BAŞLANGIÇ ÖLÇEĞİ
    let yesScale = 1.2; 
    let escapeCount = 0; 
    // YENİLENDİ: Metin değişimi için sınır 4. tıklama olarak ayarlandı
    const FORCE_CHANGE_COUNT = 4; 
    
    // İlk yüklemede EVET butonunun başlangıç ölçeğini uygula
    yesBtn.style.transform = `scale(${yesScale})`;

    // GÜVENLİ KONUM HESAPLAMA FONKSİYONU
    function calculateNewPosition(buttonWidth, buttonHeight) {
        const viewWidth = window.innerWidth;
        const viewHeight = window.innerHeight;
        const padding = 30; 

        const maxX = viewWidth - buttonWidth - padding;
        const maxY = viewHeight - buttonHeight - padding;

        const minX = padding;
        const minY = padding;

        const newX = Math.random() * (maxX - minX) + minX;
        const newY = Math.random() * (maxY - minY) + minY;
        
        const finalX = Math.max(minX, newX);
        const finalY = Math.max(minY, newY);
        
        return { x: finalX, y: finalY };
    }

    // --- HAYIR BUTONU (Sınırsız Kaçış ve Metin Değişikliği) İŞLEVİ ---
    noBtn.addEventListener('click', (e) => {
        e.preventDefault(); 
        e.stopPropagation();

        // Kaçış ve Konumlandırma
        document.body.appendChild(noBtn); 
        noBtn.style.position = 'absolute'; 
        
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        
        const newPos = calculateNewPosition(buttonWidth, buttonHeight);
        noBtn.style.left = `${newPos.x}px`;
        noBtn.style.top = `${newPos.y}px`;

        // BÜYÜME HIZI
        yesScale += 1;
        yesBtn.style.transform = `scale(${yesScale})`;
        
        escapeCount++;

        // YENİ KONTROL: Metin Değişimi
        if (escapeCount >= FORCE_CHANGE_COUNT) {
            // EVET Butonu metnini değiştir (uzatma işte)
            yesBtn.textContent = 'uzatma işte sende istiyorsuunn';

            // YENİ İSTEK: HAYIR Butonu metnini değiştir
            noBtn.textContent = 'ya bi siktir git 😠';
        }
    }); 

    // --- EVET BUTONU (NORMAL İŞLEV) ---
    yesBtn.addEventListener('click', () => {
        // Eğer 'Hayır' butonu body içindeyse, geri al.
        if (noBtn.parentElement === document.body) {
            initialButtons.appendChild(noBtn);
            noBtn.style.position = 'static';
            noBtn.style.display = 'inline-block';
        }
        
        initialButtons.classList.add('hidden');
        mainQuestion.classList.add('hidden');
        noMessage.classList.add('hidden');
        footerText.classList.add('hidden');
        yesMessage.classList.remove('hidden');
        container.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.6)';
    });
});