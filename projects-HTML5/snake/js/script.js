$(document).ready(function() {
  var canvas = $('#canvas')[0];
  var ctx = canvas.getContext('2d');
  var w = canvas.width;
  var h = canvas.height;
  var cw = 15;
  var dir = "right";
  var food;
  var score;
  var speed = 130;
  var color = 'green';
  
  var snake_array;
  
  function init() {
    create_snake();
    create_food();
    score = 0;
    dir = 'right';
    
    if(typeof game_loop != 'undefined') {
      clearInterval(game_loop);
    }
    game_loop = setInterval(paint, speed);
  }
  
  init();
  
  function create_snake() {
    var length = 5;
    snake_array = [];
    
    for(var i = length-1; i >= 0; i -=1) {
      snake_array.push({x: i, y: 0});
    }
  }
  
  function create_food() {
    food = {
      x: Math.round(Math.random()*((w-cw)/cw)),
      y: Math.round(Math.random()*((h-cw)/cw))
    };
  }
  
  function paint_cell(x,y) {
    ctx.fillStyle = color;
    ctx.fillRect(x*cw,y*cw,cw,cw);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x*cw,y*cw,cw,cw);
  }
  
  function check_collision(x,y, arr) {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i.x] === x && arr[i.y] === y) {
        return true;
      }
    }
    return false;
  }
  
  function check_score( score ) {
    if( localStorage.getItem( 'high_score' ) === null ) {
      localStorage.setItem( 'high_score', score );
    } else {
      if( score > localStorage.getItem( 'high_score' ) ) {
        localStorage.setItem('high_score', score);
      }
    }
  }
  
  function paint() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,w,h);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(0,0,w,h);
    
    var sx = snake_array[0].x;
    var sy = snake_array[0].y;
    
    if(dir === 'right') {
      sx++;
    } else if(dir === 'left') {
      sx--;
    } else if(dir === 'up') {
      sy--;
    } else if(dir === 'down') {
      sy++;
    }
    
    if(sx === -1 || sx === w/cw || sy === -1 || sy === h/cw || check_collision(sx, sy, snake_array)) {
      //init();
      $('#final_score').html(score);
      $('#overlay').fadeIn(300);
      return;
    }
    
    if(sx === food.x && sy === food.y) {
      var tail = {x: sx, y: sy};
      score++;
      create_food();
    } else {
      var tail = snake_array.pop();
      tail.x = sx;
      tail.y = sy;
    }
    snake_array.unshift(tail);
    
    for(var i = 0; i < snake_array.length; i++){
      var cell = snake_array[i];
      paint_cell(cell.x, cell.y);
    }
    
    paint_cell(food.x, food.y);
    
    check_score(score);
    
    $('#score').html('Your Score: '+ score);
    $('#high_score').html('High Score: '+ score);
  }

  $(document).keydown(function(event) {
  var key = event.which;
  
  if(key == '37' && dir !== 'right') {
    dir = 'left';
  } else if(key == '38' && dir !== 'down') {
    dir = 'up';
  }else if(key == '39' && dir !== 'left') {
    dir = 'right';
  } else if(key == '40' && dir !== 'up') {
    dir = 'down';
  }
});
});

function resetScore() {
  localStorage.setItem('high_score', '0');
  var hs_div = document.getElementById('#reset');
  hs_div.innerHTML = 'High Score: 0';
}

