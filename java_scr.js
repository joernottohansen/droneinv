var p;
var e = [];
var kuler;
var enemyLeft;
var monster;
var lyder = [];

function preload(){
    lyder.push(loadSound("skudd.wav"));
    lyder.push(loadSound("winner.wav"));
    lyder.push(loadSound("roblox.mp3"));
    lyder.push(loadSound("hit.wav"))
}

function setup() {
    createCanvas(600, 600);
    p = new player();
    kuler = new kule();
    for(var i = 0; i < 12; i++) {
        e[i] = new enemy(i * 40 + 40, 40);
    }
    enemyLeft = e.length;
    monster = new Monster();
}

function draw(score) {
    var score = Math.abs((enemyLeft-12)*2)*10;
    background(0);
    p.drawPlayer();
    p.movePlayer();
    kuler.drawKuler();
    kuler.fireKule();
    monster.drawMonster();
    monster.moveMonster();
    monster.weaponMonster();
    for(var i = 0; i < 12; i++) {
        e[i].drawEnemy();
        e[i].moveEnemy();
        e[i].playerHit();
    }
    endGame();
    checkKuleHitEnemy()
    textSize(12);
    fill(255);
    text('Droner igjen: ' + enemyLeft, 500, 575);
    text('Poeng: ' + score, 30, 30);
    winGame();
}

function player() {
    this.x = 275;
    this.y = 550;
    this.w = 50;
    this.h = 20;
    this.playerHit = false;

    this.drawPlayer = function() {
        fill(255)
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

    this.movePlayer = function() {
        this.x = mouseX - this.w/2;
    }
}

function enemy(x, y) {
    this.x = x;
    this.y = y;
    this.r = 30;
    this.speedx = 5;
    this.beenHit = false;

    this.drawEnemy = function() {
        if(this.beenHit == false) {
            fill(0, 255, 0);
            noStroke();
            ellipse(this.x, this.y, this.r, this.r);
        }
    } //end drawEnemy

    this.moveEnemy = function() {
        if(this.beenHit == false) {
            this.x += this.speedx;
            if(this.x > width || this.x < 0) {
                this.y += 40;
                this.speedx *= -1;
            }
        }
    }//slutt moveEnemy

    this.playerHit = function() {
        if(this.beenHit == false) {
            if(this.x > p.x && this.x < p.x + p.w && this.y > p.y) {
                p.playerHit = true;
                this.speedx = 0;
                
            }
        }
    }//slutt playerHit
}

function endGame() {
    if(p.playerHit) {
        background('rgb(130%, 0%, 10%)');
        p.x = 255;
        fill(255);
        noStroke();
        textSize(40);
        text('Spill over', 220, 295);
        lyder[2].playMode("restart");
        lyder[2].play();
        noLoop();
    }
}

function kule() {
    this.x = p.x + p.w/2;
    this.y = p.y;
    this.r = 10;
    this.fired = false;

    this.drawKuler = function() {
        this.x = p.x + p.w/2;
        fill(0, 255, 0);
        noStroke();
        ellipse(this.x, this.y, this.r, this.r);
        
    } //end drawKule

    this.fireKule = function() {
        if(this.fired) {
            this.y -= 20;
           
       
        }
        if(this.y < 0) {
            this.fired = false;
            
        }
        if(this.fired == false) {
            this.y = p.y;
            
        }
    } //end fireKule
}//end Kule constructor

function mousePressed() {
    kuler.fired = true;
    lyder[0].play();

}

function checkKuleHitEnemy() {
    for(var i = 0; i < e.length; i++) {
        if(p.playerHit == false){
            if(e[i].beenHit == false){
                if(kuler.x > e[i].x - e[i].r/2 && kuler.x < e[i].x + e[i].r/2 && kuler.y > e[i].y - e[i].r/2 && kuler.y < e[i].y + e[i].r/2) {
                    e[i].beenHit = true;
                    kuler.fired = false;
                    enemyLeft--;
                    lyder[3].playMode("restart");
                    lyder[3].play();
                }
            }
        }
    }
}

function winGame() {
    
    if(enemyLeft == 0){
        background(0, 255, 0);
        p.x = 255;
        fill(255);
        noStroke();
        textSize(40);
        text('wao du vant', 200, 270);
        lyder[1].playMode("restart");
        lyder[1].play();
        noLoop();
    }
}

function Monster() {
    this.x = 275;
    this.y = 0;
    this.w = 50;
    this.h=20;
    this.wX = this.x + this.w/2;
    this.wY = this.y + this.h;
    this.wR = 10;
    this.wSpeed = 8;

    this.drawMonster = function() {
        fill(255, 0, 0);
        noStroke();
        rect(this.x, this.y, this.w*2, this.h);
        ellipse(this.wX, this.wY, this.wR, this.wR);
    } //end drawMonster 
    
    this.moveMonster = function() {
        if(this.x + this.w/2 < p.x + p.w/2) {
            this.x += 3;
        }
        if(this.x + this.w/2 > p.x + p.w/2) {
            this.x -= 3;
        }
        this.wX = this.x + this.w/2;
    } //end moveMonster

    this.weaponMonster = function() {
        this.wY += this.wSpeed*2;
        if(this.wY > height) {
            this.wY = this.y;
        }
        if(this.wX > p.x && this.wX < p.x + p.w && this.wY > p.y && this.wY < p.y + p.h){
            p.playerHit = true;
            this.wSpeed = 0;

        }
    }
} 