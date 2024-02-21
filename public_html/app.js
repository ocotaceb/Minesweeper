
document.addEventListener('DOMContentLoaded', function() { /*can use "function() {}" OR "() => {}" like so, "document.addEventListener('DOMContentLoaded', () => {}"*/
    
//    const is like final (cannot modify data after its been set)
//    let allows us to modify the data whenever we want
    const grid      = document.querySelector('.grid')
    const flagsLeft = document.querySelector('#flags-left') //# is for id, sets the flags-left from html document to this variable to use here.
    const result    = document.querySelector('#result')
    const width     = 10
    let bombAmount  = 20
    let flags       = 0
    let squares     = []
    let isGameOver  = false
    
    createBoard()
    
    //Create Board
    function createBoard()
    {
        flagsLeft.innerHTML = bombAmount // sets the value of flags-left to bombAmount
        
        // get shuffled game array with random bombs
        const bombArray     = Array(bombAmount).fill('bomb')
        const emptyArray    = Array(width * width - bombAmount).fill('valid')
        const gameArray     = emptyArray.concat(bombArray)
        const shuffledArray = gameArray.sort(() => Math.random() - 0.5); // "() => Math.random() - 0.5)" great function to shuffle arrays
        
        for(let i=0; i < width*width; i++) 
        {
            const square = document.createElement('div')
            square.id = i //gives each div (square) in the grad an id so we can manage it
//            square.setAttribute(i) same as above
            square.classList.add(shuffledArray[i]) //adds the class attribute to each div stating whether it's a bomb or valid
            grid.appendChild(square)
            squares.push(square)
            
            // left click
            square.addEventListener('click', function(){
                click(square)
            })
            
            // right or wheel click
            square.addEventListener('auxclick', function(){
                addFlag(square)
            })
        }
            
        // add numbers
        for(let i=0; i < squares.length; i++)
        {
            let total = 0
            // check if there is a box on the right or left of the clicked box
            const isLeftEdge    = (i % width === 0)
            const isRightEdge   = (i % width === width - 1)

            if ( squares[i].classList.contains('valid') )
            {
                if ( i>0 && !isLeftEdge && squares[i-1].classList.contains('bomb') )
                {
                    total++
                }
                if ( i>9 && !isRightEdge && squares[i+1-width].classList.contains('bomb') )
                {
                    total++
                }
                if ( i>10 && squares[i-width].classList.contains('bomb') )
                {
                    total++
                }
                if ( i>11 && !isLeftEdge && squares[i-width-1].classList.contains('bomb') )
                {
                    total++
                }
                if ( i<99 && !isRightEdge && squares[i+1].classList.contains('bomb') )
                {
                    total++
                }
                if ( i<90 && !isLeftEdge && squares[i+width-1].classList.contains('bomb') )
                {
                    total++
                }
                if ( i<88 && !isRightEdge && squares[i+width+1].classList.contains('bomb') )
                {
                    total++
                }
                if ( i<89 && squares[i+width].classList.contains('bomb') )
                {
                    total++
                }
                squares[i].setAttribute('data', total)
            }
        }
    }
    
    
    
    function addFlag(square)
    {
        if (isGameOver)
        {
            return
        }
        if (!square.classList.contains('checked') && (flags < bombAmount))
        {
            if (!square.classList.contains('flag'))
            {
                square.classList.add('flag')
                flags++
                square.innerHTML    = '🚩'
                flagsLeft.innerHTML = bombAmount - flags
                checkForWin()
            }
            else
            {
                square.classList.remove('flags')
                flags--
                square.innerHTML    = ''
                flagsLeft.innerHTML = bombAmount - flags
            }
        }
    }
    
    function click(square)
    {
        console.log(square)
        
        if (isGameOver || square.classList.contains('pass') || square.classList.contains('flag'))
        {
            return
        }
        if (square.classList.contains('bomb'))
        {
            gameOver()
        }
        else
        {
            let total = square.getAttribute('data')
            switch (total)
            {
                case '1':
                    square.classList.add('one', 'pass')
                    break
                case '2':
                    square.classList.add('two', 'pass')
                    break
                case '3':
                    square.classList.add('three', 'pass')
                    break
                case '4':
                    square.classList.add('four', 'pass')
                    break
                case '5':
                    square.classList.add('five', 'pass')
                    break
                case '6':
                    square.classList.add('six', 'pass')
                    break
                case '7':
                    square.classList.add('seven', 'pass')
                    break
                case '8':
                    square.classList.add('eight', 'pass')
                    break
                default:
                    checkSquare(square)
                    square.classList.add('checked', 'pass')
                    return
            }
            square.innerHTML = total
        }
    }
    
    // check neighboring square once square is clicked
    function checkSquare(square)
    {
        const currentId     = square.id
        const isLeftEdge    = (currentId % width === 0)
        const isRightEdge   = (currentId % width === width-1)
        
        setTimeout( function() 
        {
            if (currentId > 0 && !isLeftEdge)   // check left square
            {
                const newId     = parseInt(currentId) - 1
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId > 9 && !isRightEdge)  // check top-right square
            {
                const newId     = parseInt(currentId) + 1 - width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId >= 10)                 // check top square
            {
                const newId     = parseInt(currentId) - width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId >= 11 && !isLeftEdge)  // check top-left square
            {
                const newId     = parseInt(currentId) - 1 - width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId <= 98 && !isRightEdge) // check right square
            {
                const newId     = parseInt(currentId) + 1
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId < 90 && !isLeftEdge) // check bottom-left square
            {
                const newId     = parseInt(currentId) - 1 + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId <= 88 && !isRightEdge) // check bottom-right square
            {
                const newId     = parseInt(currentId) + 1 + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
            if (currentId <= 89)                 // check bottom square
            {
                const newId     = parseInt(currentId) + width
                const newSquare = document.getElementById(newId)
                click(newSquare)
            }
        }, 10)
    }
    
    function checkForWin()
    {
        let matches = 0
        for (let i = 0; i < squares.length; i++)
        {
            if ( squares[i].classList.contains('flag') && squares[i].classList.contains('bomb') )
            {
                matches++
            }
            if (matches === bombAmount)
            {
                result.innerHTML    = 'YOU WIN!'
                isGameOver          = true
            }
        }
    }
    
    function gameOver()
    {
        result.innerHTML    = 'BOOM! Game Over'
        isGameOver          = true
        
        // show all bombs
        squares.forEach(function(square) 
        {
            if ( square.classList.contains('bomb') )
            {
                square.innerHTML = '💣'
                square.classList.remove('bomb')
                square.classList.add('checked')
            }
        })
    }
})
