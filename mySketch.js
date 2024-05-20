// Kahraman karakterini temsil eden sprite
let hero;

// Mikrofon girişi için p5.AudioIn nesnesi
let mic;

// Döndürme açısı
let rotationAngle = 0;

// Mikrofon hassasiyeti ve temel döndürme hızı
let micsensitivity = 17;
let baseRotationSpeed = 0.01;

// Aktif döndürme hızı
let rotationSpeed = baseRotationSpeed;

// Dur, dans ve dinlen butonları için resimler
let standButton, danceButton, restButton;

// preload() fonksiyonu, gerekli resimleri ve animasyonları yükler
function preload() {
  // Kahraman karakterini oluştur ve animasyonları tanımla
  hero = createSprite(250, 250, 32, 32);
  hero.addAnimation('stand', 'stand.png');
  hero.addAnimation('dance', 'dance0.png', 'dance1.png', 'dance2.png', 'dance3.png');
  hero.addAnimation('rest', 'rest1.png', 'rest2.png', 'rest3.png', 'rest4.png', 'rest5.png', 'rest6.png', 'rest7.png', 'rest8.png');
  hero.animation.frameDelay = 20; // Animasyonlar arasındaki bekleme süresi

  // Dur, dans ve dinlen butonları için resimleri yükle
  standButton = loadImage('standbutton.png');
  danceButton = loadImage('startbutton.png');
  restButton = loadImage('restbutton.png');
}

// setup() fonksiyonu, canvas'ı oluşturur ve mikrofonu başlatır
function setup() {
  createCanvas(500, 500);
  mic = new p5.AudioIn();
  mic.start(1); // İkinci ses girişi kanalını kullanarak mikrofonu başlat
}

// draw() fonksiyonu, ana çizim döngüsü
function draw() {
  background(200);

  // Ekran üzerinde dur, dans ve dinlen butonlarını göster
  image(standButton, 50, 50, 100, 40);
  image(danceButton, 200, 50, 100, 40);
  image(restButton, 350, 50, 100, 40);

  // Mikrofon ses seviyesini al
  let volume = mic.getLevel() * micsensitivity;

  // Döndürme hızını ses seviyesine göre belirle
  rotationSpeed = map(volume, 0, 1, baseRotationSpeed, baseRotationSpeed * 20000);

  // Döndürme açısını güncelle
  rotationAngle += rotationSpeed;

  // Döndürme hızını tam sayıya yuvarla
  let roundedRotationSpeed = Math.round(rotationSpeed);

  // Klavye girişlerine göre kahramanın durumunu güncelle
  if (key === 's') {
    hero.changeAnimation('stand');
    hero.animation.frameDelay = 12;
  }

  if (key === 'd') {
    hero.changeAnimation('dance');
    // Dans animasyonunun frame bekleme süresini ses seviyesine bağlı olarak belirle
    hero.animation.frameDelay = volume < 0.1 ? 20 : (volume >= 0.1 && volume <= 0.2 ? 10 : (volume >= 0.21 && volume <= 0.49 ? 4 : 2));
  }

  if (key === 'r') {
    hero.changeAnimation('rest');
    hero.animation.frameDelay = 30;
  }

  // Bilgilendirme yazılarını ekrana yazdır
  resetMatrix();
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text("Ses Seviyesi: " + volume.toFixed(2), 250, 450);
}

// mouseClicked() fonksiyonu, fare tıklamasını kontrol eder
function mouseClicked() {
  // Hangi butonun tıklandığını kontrol et
  if (mouseX > 50 && mouseX < 150 && mouseY > 50 && mouseY < 90) {
    key = 's';
  } else if (mouseX > 200 && mouseX < 300 && mouseY > 50 && mouseY < 90) {
    key = 'd';
  } else if (mouseX > 350 && mouseX < 450 && mouseY > 50 && mouseY < 90) {
    key = 'r';
  }
}
