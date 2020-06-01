/**
 * Array. 
 * 
 * An array is a list of data. Each piece of data in an array 
 * is identified by an index number representing its position in 
 * the array. Arrays are zero based, which means that the first 
 * element in the array is [0], the second element is [1], and so on. 
 * In this example, an array named "coswave" is created and
 * filled with the cosine values. This data is displayed three 
 * separate ways on the screen.  
 */


public class square 
{ 
    // Instance Variables 
    int xCoord; 
    int yCoord; 
    int val;  
  
    // Constructor Declaration of Class 
    public square(int xCoord, int yCoord, int val) 
    { 
        this.xCoord = xCoord; 
        this.yCoord = yCoord; 
        this.val = val; 
    } 

    public int getxCoord() 
    { 
        return xCoord; 
    } 
    
    public int getyCoord() 
    { 
        return yCoord; 
    } 
    
    public int getVal() 
    { 
        return val; 
    }
    
    public void setxCoord(int x1) 
    { 
        this.xCoord = x1; 
    } 
    
    public void setyCoord(int y1) 
    { 
        this.yCoord = y1; 
    } 
    
    public void setVal(int val1) 
    { 
        this.val = val1; 
    } 
}

    public void moveRight(){
      for(int i=0; i<gameBoard.length; i++){
        for(int j=gameBoard[i].length-1; j>0; j--){
            if(gameBoard[i][j+1].getVal()==gameBoard[i][j].getVal()){
                gameBoard[i][j+1].setVal(gameBoard[i][j].getVal()*2);
                gameBoard[i][j].setVal(0);
            }
            else{
                gameBoard[i][j+1].setVal(gameBoard[i][j].getVal());
                gameBoard[i][j].setVal(0);
            }
        }
      }
    }
    
    public void moveLeft(){
      for(int i=0; i<gameBoard.length; i++){
        for(int j=1; j<gameBoard[i].length; j++){
            if(gameBoard[i][j-1].getVal()==gameBoard[i][j].getVal()){
                gameBoard[i][j-1].setVal(gameBoard[i][j].getVal()*2);
                gameBoard[i][j].setVal(0);
            }
            else{
                gameBoard[i][j-1].setVal(gameBoard[i][j].getVal());
                gameBoard[i][j].setVal(0);
            }
        }
      }
    }
    
    public void moveUp(){
      for(int i=1; i<gameBoard.length; i++){
        for(int j=0; j<gameBoard[i].length; j++){
            if(gameBoard[i-1][j].getVal()==gameBoard[i][j].getVal()){
                gameBoard[i-1][j].setVal(gameBoard[i][j].getVal()*2);
                gameBoard[i][j].setVal(0);
            } //<>//
            else{
                gameBoard[i-1][j].setVal(gameBoard[i][j].getVal());
                gameBoard[i][j].setVal(0);
            }
        }
      }
    }
    
    public void moveDown(){
      for(int i=0; i<gameBoard.length-1; i++){
        for(int j=0; j<gameBoard[i].length-1; j++){
            if(gameBoard[i+1][j].getVal()==gameBoard[i][j].getVal()){
                gameBoard[i+1][j].setVal(gameBoard[i][j].getVal()*2);
                gameBoard[i][j].setVal(0);
            }
            else{
                gameBoard[i+1][j].setVal(gameBoard[i][j].getVal());
                gameBoard[i][j].setVal(0);
            }
        }
      }
    }

square[][] gameBoard;

void makeTile(int val, int center1, int center2, float tileHeight, float tileWidth){
    fill(255);
    rect(center1, center2, tileHeight, tileWidth);
    fill(0);
    text(val, center1, center2);
}

void generateNewTileVal(square[][] board){
  
    // choose a row
    int rand1 = int(random(4));
    // choose a column
    int rand2 = int(random(4));
  
  while(board[rand1][rand2].getVal()!=0){
    // choose a row
    rand1 = int(random(4));
    // choose a column
    rand2 = int(random(4));
  }
    println("Found!", rand1, rand2);
    int newTileVal = int(random(11));
    if(newTileVal == 1){
       board[rand1][rand2].setVal(4);
    }
    else{
       board[rand1][rand2].setVal(2);
    }
    
  }
 

void setup() {
  size(800, 800);
  rectMode(CENTER);
  gameBoard = new square[4][4];
  for(int i=0; i<gameBoard.length; i++){
    for(int j=0; j<gameBoard[i].length; j++){
      gameBoard[i][j]= new square(i, j, 0);
    }
  }
  generateNewTileVal(gameBoard);
  generateNewTileVal(gameBoard);
}

void keyPressed()
{
    if (keyCode == LEFT)
    {
      println("LEFT");
      moveLeft(); //<>//
    }
    else if(keyCode == RIGHT)
    {
      println("RIGHT");
      moveRight();
    }
    else if (keyCode == UP)
    {
      println("UP");
      moveUp();
    }
    else if(keyCode == DOWN)
    {
      println("DOWN");
      moveDown();
    }
    
}
 
void draw() {
  background(255);
 
  fill(210,196,180);
  
  int boardWidth = width/4;
  int boardHeight = height/4;
  
  rect(372, 372, 200, 200);
  fill(0);
  text(0, 400, 400);
  fill(255);
  for(int i=0; i<gameBoard.length; i++){
    for(int j=0; j<gameBoard[i].length; j++){
      makeTile(gameBoard[i][j].getVal(), 300+boardWidth/5 * i +( i*8), 300 + boardHeight/5 * j+ (j*8), boardHeight/4.4, boardWidth/4.4);
    }
  }
}
