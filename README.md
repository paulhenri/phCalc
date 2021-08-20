# phCalc - A simple javascript calculator #

A simple calculator made along The Odin Project - The main idea is to mimic how the iOS calculator works : 
1. You type your first number
2. You select an operator - The operator key stays lit
3. You type your second number, the first number disappear and the new number is show on the screen
4. If you type = or ENTER the result is displayed. Same thing if you push a new operator key

The calculator can be tested here : <link>


:nut_and_bolt: ##How does it works ?## :nut_and_bolt:
The layout is made entirely in HTML / CSS. Js code has different missions : 
* Put events on keys (Click) and keypad
* Collect datas from events and route them 
* Process inputs

Inputs are stored in an array until an operator is used. After each use of an operator the left part of the operation that was stored is replaced with the result of the last operation (Except for the first time an operator is used then the left part is just replaced by the number converted from the input array)

:information_source: Example :
1. 230 is typed - We now have an array with [2, 3, 0] and a left value equal to 0.
2. Plus(+) operator is used - Array is flushed in the left value (The array is now empty)
3. 550 is typed - We have a left value equal to 230 and an array containing [5,5,0]
4. Plus(+) is used again, the calcultor add 230 to 550 (converted from the input array) and store the result in the left value.
5. Things can go on and on...
