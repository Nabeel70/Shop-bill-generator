function addRow(tableID) {
  var table = document.getElementById(tableID);
  var rowCount = table.rows.length;
  if (rowCount < 50) { // limit the user from creating fields more than your limits
    var row = table.insertRow(rowCount);

    var colCount = table.rows[0].cells.length;
    row.id = 'row_' + rowCount;
    for (var i = 0; i < colCount; i++) {
      var newcell = row.insertCell(i);
      newcell.outerHTML = table.rows[0].cells[i].outerHTML;
    }
    var listitems = row.querySelectorAll("input, select");

    for (i = 0; i < listitems.length; i++) {
      listitems[i].setAttribute("oninput", "calculate('" + row.id + "')");
    }

  } else {
    alert("Maximum Passenger per ticket is 4.");

  }
}

function calculate(elementID) {
  var mainRow = document.getElementById(elementID);
  var myBox1 = mainRow.querySelectorAll('[name=qty]')[0].value;
  var myBox3 = mainRow.querySelectorAll('[name^=sel]')[0].value;
  var total = mainRow.querySelectorAll('[name=total]')[0];
  var disPer = mainRow.querySelectorAll('[name=dis]')[0].value;
  var disAmount = mainRow.querySelectorAll('[name=disam]')[0];
  var allPrice = mainRow.querySelectorAll('[name=allpr]')[0];

  let myResult1 = Math.round (myBox1* myBox3).toFixed(2);
  total.value = myResult1;

  let myResult2 = Math.round ((disPer / 100)* total.value).toFixed(2);
  disAmount.value = myResult2;

  let myResult3 = Math.round (total.value - disAmount.value).toFixed(2);
  allPrice.value = myResult3;
  totalvalues();// calling my function here
}

function totalvalues() {
    var table = document.getElementById("dataTable");
    var grossrates = 0;
    var finalvalues = 0;
    var discountamount = 0;
    for (var i = 0, row; row = table.rows[i]; i++) {
      //rows would be accessed using the "row" variable assigned in the for loop
      for (var j = 0, col; col = row.cells[j]; j++) {
        //columns would be accessed using the "col" variable assigned in the for loop
        if(col.children[1].value != ''){
        if (j == 2) {
          //alert('col html>>'+col.children[1].value);
          
            grossrates += (Math.round (parseFloat(col.children[1].value).toFixed(2)));
          
         
        }
        if (j == 5) {
            //alert('col html>>'+col.children[1].value);
            finalvalues += (Math.round (parseFloat(col.children[1].value).toFixed(2)));
          }
        if (j == 4) {
            //alert('col html>>'+col.children[1].value);
            discountamount += (Math.round (parseFloat(col.children[1].value).toFixed(2)));
          }
      }}
    }

    var grandGross = document.getElementById('grossTax');
    grandGross.value = grossrates;

    var totalDiscount = document.getElementById('totalDis')
    totalDiscount.value = discountamount;

    var grand = document.getElementById('grandTotal');
    grand.value = finalvalues;
    
    var grand = document.getElementById('recievedAmt');
    grand.value = 0;
    
    var grand = document.getElementById('additionalAdj');
    grand.value = 0;
    // console.log(totalcellvalue);
  }
  
  // And I have called the above method ```totalvalues()`` in your ```calculate()``` method.