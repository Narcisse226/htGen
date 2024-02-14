

faciliter la generation du code html sans savoir a ecrire le code de base


 gener un element simple
gen h2=generer un <h2>
gen h2.hello=<h2 class="hello">
gen h2#hello=<h2 id="hello">


gen div h2=<div>
            <h2></h2>
            </div>


gen div.hello h2=<div class="hello">
            <h2></h2>
            </div>

gen div h2#hi=<div class="hello">
            <h2 id="hi"></h2>
            </div>


gen div h2 / div p= 
<div >
            <h2 ></h2>
</div>
<div >
            <p></p>
</div>



div h2 p= <div >
            <h2></h2>
            <p></p>
</div>



div div=
        <div>
            <div>
            
            </div>
        </div>

div div div=

     <div>
            <div>
            
            </div>

              <div>
            
            </div>
        </div>


div div p div=

     <div>
            <div>
            <p></p>
            </div>

            <div>
            
            </div>
        </div>

div div p div span=

     <div>
            <div>
            <p></p>
            </div>

              <div>
            <span>
            </span>
             </div>
    </div>






div div p div span/ div h2=
     <div>
            <div>
            <p></p>
            </div>

              <div>
            <span>
            </span>
             </div>
    </div>
    <div>


    <h2>


    </h2>

    </div>



    
div div p div span/ div h2=