import React from 'react'
import { Link } from 'react-router-dom'
function TermsdeliveryScreen() {




    return (
        <div className="TermsdeliveryScreen Describe">
            <div class="maxWidth">
                <div class="topTitle">Delivery &amp; Returns</div>
                <div class="topCont">
                    <p>Standard terms for delivery and returns of your purchases.</p>
                    <h2><strong>Delivery</strong></h2>
                   <ul className="no-padding"> 
                       <li>Delivery of the goods shall be made to such location as the Buyer shall direct. Carriage shall be paid for by the buyer. Any time agreed between the parties for such delivery shall be of the essence of the Agreement and the Buyer shall be entitled to cancel, without notice, the whole or any part of this Agreement if this Clause is not complied with by the Supplier.</li>
                        <li>Where the Buyer cancels the whole or part of the contract in accordance with the above Clause:</li>
                    </ul>
                    <ol>
                        <li>all sums payable by the Buyer in relation to the whole or part of the contract cancelled shall cease to become payable;</li>
                        <li>all sums paid by the Buyer in relation to the whole or part of the contract cancelled shall be repaid by the Supplier immediately;</li>
                        <li>the Buyer shall be entitled to recover damages from the Supplier for any loss caused as a result of the Supplier’s failure to deliver the goods and/or as a result of the cancellation of the whole or part of the contract.</li>
                    </ol>
                    <ul className="no-padding"><li><span>Minimum order value of £100 for free delivery on boxed items. Please note hazardous goods for transport, 200ltr drums and orders weighing more than 100kg are subject to minimum order regulations due to transport restrictions.&nbsp; Orders with a quantity of only&nbsp;one 200ltr drum will incur a delivery charge.&nbsp; Orders which include hazardous goods and do not meet the minimum delivery requirements will also incur a delivery charge.&nbsp; Orders with two or more 200ltr drums will not be subject to delivery charges. Delivery charges vary dependent on weight and contents, between a minimum of £5.00 and maximum of £20.00.</span></li></ul>
                    <h2><strong>Returns</strong></h2>
                    <ol class="ol1">
                        <li class="li1"><span class="s1">If the Buyer no longer wants the goods or is not satisfied with the goods due to no fault with the product, i.e. does not like colour, style, no longer needs the item etc. and requests a refund the Buyer is subject to a handling fee.</span></li>
                        <li class="li1"><span class="s1"> The handling fee is 20% of the original sale price of the order and will be deducted from the amount refunded back to the Buyer under the condition that the Supplier received the returned item in a resalable condition without any damages or signs of obvious use. </span></li>
                        <li class="li1"><span class="s1">All items that are to be returned to the Seller shall be in the exact same condition as when the item was originally dispatched to the Buyer. All labels and fitting will still be attached and untampered with. </span></li>
                        <li class="li1"><span class="s1">All items received are subject to a quality control check to determine that the item meets the above criteria before refunds/ credits can be issued. </span></li>
                        <li class="li1"><span class="s1">If the Supplier feels that the item is not fit for resale or has been tampered, damaged or used, the Supplier withholds the rights to offer any refund/credit to the Buyer.</span></li>
                        <li class="li1"><span class="s1">The 20% handling fee is exempt if the Buyer notifies the Supplier within a 24 hour time scale from the time of placing the order in dispute.</span></li>
                        <li class="li1"><span class="s1">The Supplier reserves the right to inform the Buyer of the refusal of refund/credit in writing addressed to the address details held on the Suppliers database.</span></li>
                    </ol>
                </div>
            </div>
            <div style={{ 'background-color': ' rgb(135, 200, 210)' }}>
                <div class="maxWidth flex secctBtn">
                    <div class="title">Check Out Our Products</div>
                    <div class="btns"><Link to="/">Shop Now</Link></div>
                </div>
            </div>
        </div>

    )
}

export default TermsdeliveryScreen