(function(){
  'use strict';

 
 

  let timer = document.getElementById('timer');
  let start = document.getElementById('start');
  let stop = document.getElementById('stop');
  let reset = document.getElementById('reset');

  //クリック時の時間を保持するための変数
  let startTime;

  //経過時刻を更新するための変数。 初めはだから0で初期化
  let elapsedTime = 0;

  //   ID
　let timerId;

  //タイマーをストップ -> 再開させたら0になってしまうのを避けるための変数。
    
  let timeToadd = 0;


   function updateTimetText(){
   let m = Math.floor(elapsedTime / 60000);　
   let s = Math.floor(elapsedTime % 60000 / 1000);
   let ms = elapsedTime % 1000;


    m = ('0' + m).slice(-2); 
    s = ('0' + s).slice(-2);
    ms = ('0' + ms).slice(-3);

    //HTMLのid　timer部分に表示させる　
    timer.textContent = m + ':' + s + ':' + ms;
    }


    
    function countUp(){
        timerId = setTimeout(function(){
        elapsedTime = Date.now() - startTime + timeToadd;
        updateTimetText()
        countUp();
        },10);
    }


　　// 　　活性化非活性化 start
　　function setButtonStateInitial( ){
     start.disabled = false;
     stop.disabled = true;
     reset.disabled = true;
　　}
　　
  
    // 活性化非活性化　stop
    function setButtonStaterunning(){
     start.disabled = true;
     stop.disabled = false;
     reset.disabled = true;
    }
    
    // 活性化非活性化　reset
    function setButtonStateStopped(){
     start.disabled = false;
     stop.disabled = true;
     reset.disabled = false;
    }
    
     setButtonStateInitial();
     
     
    
    //startボタンクリックした時のイベント表記
    start.addEventListener('click',function(){
     setButtonStaterunning();
     startTime = Date.now();
     countUp();
    });

    //stopボタンクリックした時のイベント表記
    stop.addEventListener('click',function(){
　　  setButtonStateStopped();
　　  clearTimeout(timerId);
      timeToadd += Date.now() - startTime;
    });

    //resetボタンクリックした時のイベント表記
    reset.addEventListener('click',function(){
        setButtonStateInitial();
        elapsedTime = 0;
        timeToadd = 0;

        //0になったタイムを表示
        updateTimetText();

    });
})();