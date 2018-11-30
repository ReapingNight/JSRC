var piece = new Object()
{
    color;                  //0 - Black; 1 - White
    type;                   //0 - Pawn; 1 - Rook; 2 - Knight; 3 - Bishop; 4 - Queen; 5 - King
    position;
}

function piece(color, type, position)
{
    this.color = color;
    this.type = type;
    this.position = position;
}

piece.prototype.getPosition = function(){return this.position;};
piece.prototype.setPosition = function(pos){this.position = pos;};
piece.prototype.getColor = function(){return this.color;};
piece.prototype.getType = function(){return this.type;};