/** phCalc - A simple calculator made for the Odin Project */

/** LCD screen div selector */
const SCREEN = document.querySelector('.screen');

/** The carry is the last number computed / typed
  * Each time we use an operator the number being typed is computed with last
  * operator and the result is stored in the carry */
let CARRY = 0;

/** Stack where typing is stored */
let TYPING = [];

/** Last operator that was typed*/
let OPERATOR = '';

const KEYS = document.querySelectorAll('.key');
const OP_KEYS = document.querySelectorAll('.operator');

window.addEventListener('keydown', (event) => {
  keyhandler(event.key);
});

KEYS.forEach( (key) => key.addEventListener('transitionend', removeTransition));

KEYS.forEach( (key) => key.addEventListener('click', (eve) => {
  keyhandler(eve.target.innerText);
} ) );

OP_KEYS.forEach( (opkey) => opkey.addEventListener('click', (eve) => {
  keyhandler(eve.target.innerText);
}) ); ;

/** Deals with pressed key
 * @param {event} e - Event transmited by the listener
* */
function keyhandler(e) {
  switch (e) {
    case 'C':
      resetCalc();
      break;
    case 'NumLock':
      resetCalc();
      break;
    case '+':
      setOperator('+');
      break;
    case '-':
      setOperator('-');
      break;
    case '*':
      setOperator('*');
      break;
    case '/':
      setOperator('/');
      break;
    case '0':
      setOperand(0);
      break;
    case '1':
      setOperand(1);
      break;
    case '2':
      setOperand(2);
      break;
    case '3':
      setOperand(3);
      break;
    case '4':
      setOperand(4);
      break;
    case '5':
      setOperand(5);
      break;
    case '6':
      setOperand(6);
      break;
    case '7':
      setOperand(7);
      break;
    case '8':
      setOperand(8);
      break;
    case '9':
      setOperand(9);
      break;
    case '.':
      setDot();
      break;
    case 'Enter':
      computeOperation();
    case '=':
      computeOperation();
      break;
    default:
      console.log(e);
  }
}

/** To light the key that was pressed
 * @param {string} key: The key that need to be lit */
function lightKey(key) {
  const myKey = Array.from(document.querySelectorAll('.key')).find( (e) =>
    e.innerText == key);
  myKey.classList.add('lit');
}

/** Turn the light on the last operator key that was pressed, except for the '='
 * and 'C' operator
 * @param {string} op : Operator typed */
function lightOperator(op) {
  document.querySelectorAll('.operator').forEach((el) => {
    if (el.innerText == op) {
      el.classList.add('operator_lit');
    } else {
      el.classList.remove('operator_lit');
    }
  },
  );
}


/** Function to handle divide by zero */
function divideZeroException() {
  alert(`Dividing by zero is bad... Trees are being cut while you try to blow 
  up the calculator...`);
  TYPING = [];
  OPERATOR='';
  CARRY=0;
  refreshLcd(0);
}


/** Compute last operation, flush the result to the carry
  * */
function computeOperation() {
  if (OPERATOR != '') {
    const right = convertTyping();
    console.log(`Carry == ${CARRY}`);
    console.log(`RIGHT = ${right}`);
    switch (OPERATOR) {
      case '+':
        CARRY = CARRY + right;
        break;
      case '-':
        CARRY = CARRY - right;
        break;
      case '*':
        CARRY = CARRY * right;
        break;
      case '/':
        if (right != 0) {
          CARRY = CARRY / right;
          break;
        } else {
          // What the heck are you doing ?! Why do you want to divide by zero ?!
          divideZeroException();
          resetCalc();
        }
      default:
        console.log(`No know operator ${OPERATOR}`);
        break;
    }
    TYPING = [];
    refreshLcd(CARRY);
  }
}


/** Compute the last operation if possible, flush the result to the carry
 * @param {string} op : Operator ( + - * /)
  */
function setOperator(op) {
  lightOperator(op);

  if (OPERATOR != '' && TYPING.length > 0 ) {
    computeOperation();
  } else {
    CARRY = convertTyping();
    TYPING= [];
  }
  OPERATOR=op;
}

/** Return the number value that was typed
 * @return {float} - Result
*/
function convertTyping() {
  return Number(TYPING.join(''));
}

/** Function to write LEFT_VALUE or RIGHT_VALUE
  * @param {integer} num - Unit number being written
  * **/
function setOperand(num) {
  lightKey(num);
  TYPING.push(num);
  refreshLcd(TYPING.join(''));
}
/** To add a decimal separator to the current value
 * @return {boolean} - True if there was no previous decimal separator or
 *   false is it was already in place
*/
function setDot() {
  lightKey('.');
  if (TYPING.indexOf('.') == -1) {
    TYPING.push('.');
    return true;
  } else {
    return false;
  }
}

/** Blank and fill the 'lcd' screen of the calculator
 * @param {string} content : Content the lcd will be filled with.
  * */
function refreshLcd(content) {
  console.log(SCREEN);
  SCREEN.innerText = content;
}

/** Remove lit class from the key once the transition is done
 * @param {event} eve: Event passed by listener */
function removeTransition(eve) {
  if (eve.propertyName !== 'transform') return;
  this.classList.remove('lit');
}

/** Reset the calculator, empty buffer and operator */
function resetCalc() {
  // Lighting an operator that does not exists -> Shutting down every operators
  lightOperator('%');
  TYPING=[];
  CARRY=0;
  OPERATOR='';
  refreshLcd(CARRY);
}
