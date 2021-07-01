'use strict';

// Constructor
var Header = function() {
    var header = $('.header');
    var body = $('body');
    var menuOpen = $('.header__hamburguer');
    var menuClose = $('.header__nav__close');

    menuOpen.on('click', function(){
        header.addClass('-open');
        body.addClass('-hideOverflow');
    });

    menuClose.on('click', function(){
        header.removeClass('-open');
        body.removeClass('-hideOverflow');
        });



    // const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    // const observeDOM = (target, callback) => {
    //     let obs = new MutationObserver(function (mutations, observer) {
    //         console.log(mutations[node]);
    //         if (mutations[0].addedNodes.length || mutations[0].removedNodes.length) {
    //             callback();
    //         }
    //     });
    //     // have the observer observe foo for changes in children
    //     obs.observe(target, { childList: true, subtree: true });
    //     return obs;
    // }

    // const observeDOMAddedNode = (target, callback, nodeClass) => {
    //     let obs = new MutationObserver(function (mutations) {
    //         console.log(mutations);

    //         if(mutations[0].addedNodes[0].className === nodeClass) {
    //             console.log('node added')
    //             callback();
    //         }
    //     });
    //     // have the observer observe foo for changes in children
    //     obs.observe(target, { childList: true, subtree: true });
    //     return obs;
    // }

    // const observeDOMRemovedNode = (target, callback, nodeClass) => {
    //     let obs = new MutationObserver(function (mutations) {
    //         if (mutations[0].removedNodes[0].className === nodeClass) {
    //             console.log('node removed')
    //             callback();
    //         }
    //     });
    //     // have the observer observe foo for changes in children
    //     obs.observe(target, { childList: true, subtree: true });
    //     return obs;
    // }

    // const dispatchMouseEvent = ($target, eventName) => {
    //     if ($target.length == 0) return false;
    //     const mouseEvent = document.createEvent('MouseEvents');
    //     mouseEvent.initEvent(eventName);
    //     $target[0].dispatchEvent(mouseEvent);
    //     return true;
    // };

    // const mouseDown = target => dispatchMouseEvent(target, 'mousedown');
    // const mouseUp = target => dispatchMouseEvent(target, 'mouseup');
    // const mouseClick = target => {
    //     return mouseDown(target) && mouseUp(target) && target.addClass('-selected');
    // }

    // function isPlayerSelected(playersList) {
    //     let isSelected = playersList.hasClass('-selected');

    //     if(!isSelected) {
    //         let newPlayersList = $('.home__list li button'); 
    //         setTimeout(() => {
    //             isPlayerSelected(newPlayersList);
    //         }, 1000);
    //     }

    //     let selectedPlayer = $('.-selected');

    //     return selectedPlayer;
    // }

    // function getSelectedPlayer(playersList) {
    //     return new Promise(resolve => {
    //         resolve(isPlayerSelected(playersList))
    //     })
    // }

    // function loop(counter, players) {
    //     players.removeClass('-selected');
    //     mouseClick($(players[counter]));

    //     $.when(
    //         getSelectedPlayer(players)
    //     ).then(selectedPlayer => {
    //         buyNow();
    //         return selectedPlayer;
    //     }).done(data2 => {
    //         console.log(data2);

    //         if (counter < players.length - 1) {
    //             counter++;

    //             loop(counter, players);
    //         }
    //     })
    // }

    // const buyButton = $('.home__button');
    // const buyButton2 = $('.home__button2');
    // let buyNowConfirmObserver = null;

    // buyButton.on('click', () => {
    //     const p = '<p class="home__box selected clicked">BOX</p>';

    //     return $('.home').append(p);
    // })

    // buyButton2.on('click', () => {
    //     const p = '<p class="home__box2">BOX</p>';
        
    //     return $('.home').append(p); 
    // })

    // buyNowConfirmObserver = observeDOMAddedNode($('.home')[0], () => {
    //     alert('BuyBox creado');
    // }, 'home__box selected');
    

    // const search = () => {
    //     let searchContainer = $(".home__list");

    //     let preventLoop = false;
    //     let playersInList;
    //     let buyButton;

    //     let searchItemsObserver = observeDOM(searchContainer[0], () => {
    //         buyButton = $('.home__button');
    //         playersInList = $('.home__list li button');
            
    //         if(playersInList.length > 0 && !preventLoop && buyButton.length > 0) {
    //             // searchItemsObserver.disconnect();

    //             let counter = 0;
    //             preventLoop = true;
    
    //             loop(counter, playersInList);
    //         }
    //     });
    // }

    // search();

    // setInterval(() => {
    //     $('.home__list').append('<li><button>player</button></li>');    
    // }, 2000);

    const observeDOMAddedNode = (target, callback, nodeClass) => {
        let obs = new MutationObserver(function (mutations) {
            const targettedMutation = mutations.filter(mutation => {
                console.log(mutation);
                return mutation.addedNodes.length > 0 && mutation.addedNodes[0].className === nodeClass;
            })

            console.log('targetted mutation', targettedMutation)

            if(targettedMutation.length > 0) {
                callback(mutations);
            }
        });
        // have the observer observe foo for changes in children
        obs.observe(target, { childList: true, subtree: true });
        return obs;
    }

        const observeDOMRemovedNode = (target, callback, nodeClass) => {
        let obs = new MutationObserver(function (mutations) {
            const targettedMutation = mutations.filter(mutation => {
                return mutation.removedNodes[0].className === nodeClass;
            })

            if (targettedMutation.length > 0) {
                callback();
            }
        });
        // have the observer observe foo for changes in children
        obs.observe(target, { childList: true, subtree: true });
        return obs;
    }

    const observeDOMAddedClass = (target, callback, nodeClass) => {
        let obs = new MutationObserver(function (mutations) {
            console.log('added Class', mutations);

            const targettedMutation = mutations.filter(mutation => {
                return mutation.target.className.indexOf(nodeClass) >= 0;
            });

            if(targettedMutation.length > 0) {
                callback(mutations);
            }
        });
        // have the observer observe foo for changes in children
        obs.observe(target, { subtree: true, attributeOldValue: true, attributes: true });
        return obs;
    }

    const observeDOMRemovedClass = (target, callback, nodeClass) => {
        let obs = new MutationObserver(function (mutations) {

            const targettedMutation = mutations.filter(mutation => {
                return mutation.target.classList;
            });

            callback();
        });
        // have the observer observe foo for changes in children
        obs.observe(target, { subtree: true, attributeOldValue: true, attributes: true });
        return obs;
    }

    const observeDOMCharacterData = (target, callback, nodeClass) => {
        let obs = new MutationObserver(function (mutations) {
            console.log('character data', mutations);

            callback(mutations);
        });
        // have the observer observe foo for changes in children
        obs.observe(target, { subtree: true, characterData: true, characterDataOldValue: true });
        return obs;
    }

    const dispatchMouseEvent = ($target, eventName) => {
        if ($target.length == 0) return false;
        const mouseEvent = document.createEvent('MouseEvents');
        mouseEvent.initEvent(eventName);
        $target[0].dispatchEvent(mouseEvent);
        return true;
    };

    // Click Simulator
    const mouseDown = target => dispatchMouseEvent(target, 'mousedown');
    const mouseUp = target => dispatchMouseEvent(target, 'mouseup');
    const mouseClick = target => {
        // $('div').removeAttr('id');
        // $('button').removeAttr('id');
        // $('span').removeAttr('id');
        // $('li').removeAttr('id');

        return mouseDown(target) && mouseUp(target);
    }


    let playersIndex = 0;
    const playersList = $('.listFUTItem');
    const playersCallToAction = $('.rowContent.has-tap-callback');
    const buyButton = $('.btn-standard.buyButton.currency-coins');
    const observedContainer = $('main');
    const buttonsPanel = $('.ut-button-group');
    const wonButtonsContainerClass = "won-buttons-container";
    let price = 0;
    let closeModal = null;
    let clickInPlayer = null;
    let sendPlayerToTransferPile = null;
    let playerExpiredStatus = null;
    let playerWonStatus = null;
    let buyButtonStatusAction = null;
    const modalContainerClass = "view-modal-container form-modal";
    const wonItemClass = "listFUTItem has-auction-data selected won"
    
    console.log(buyButton);
    // const DomClassTester = observeDOMAddedClass(observedContainer[0], () => {
    //     console.log('class tester');
    // }, 'won')

    // clickInPlayer = observeDOMRemovedNode(observedContainer[0], () => {
    //     let wonButtonsContainer = $('.won-buttons-container');
    //     wonButtonsContainer.remove();

    //     if(playersList.length >= playersIndex) {
    //         playersIndex++
    //         console.log(playersIndex);

    //         mouseClick($(playersList[playersIndex]));
    //         $(playersList[playersIndex]).click()
            
    //         mouseClick($(playersCallToAction[playersIndex]));
    //         $(playersCallToAction[playersIndex]).click()
    //     } else {
    //         console.log('observers disconected');
    //         sendPlayerToTransferPile.disconect();
    //         setWonClass.disconect();
    //         closeModal.disconect();
    //         clickInPlayer.disconect();
    //         DomClassTester.disconect();
    //     }

    // }, wonItemClass);

    // removePlayerFromPile = observeDOMRemovedNode();

    // sendPlayerToTransferPile = observeDOMAddedNode(observedContainer[0], () => {
    //     const sendToClubButton = $('.won-buttons-container button:eq(6)');

    //     // sendToClubButton.on('click', () => {sendToClub()});

    //     // mouseClick(sendToClubButton);
    //     // sendToClubButton.click();

    // }, wonButtonsContainerClass);

    // Observer despues del click en buyButton
    closeModal = observeDOMAddedNode(observedContainer[0], function() {
        const modalCloseButton = $('.dialog-body .ut-button-group button:eq(0)');

        modalCloseButton.on('click', () => {
            removeModal();
        })
        
        mouseClick(modalCloseButton);
        modalCloseButton.click();

        // Solo para Dev
        $(playersList[playersIndex]).addClass('won');
        
    }, modalContainerClass);

    let buyButtonObserver = null;

    buyButtonObserver = observeDOMCharacterData(observedContainer[0], function() {
        console.log('characterData callback');
    }, 'buyButton');

    //Dom Obs de clase del jugador comprado/perdido despues del click en buyNow
    playerWonStatus = observeDOMAddedClass(observedContainer[0], () => {
        // Solo para Dev
        generateWonButtons();

        const sendToClubButton = $('.won-buttons-container button:eq(6)');

        sendToClubButton.on('click', () => {sendToClub()});

        mouseClick(sendToClubButton);
        sendToClubButton.click();

        // Solo para Dev
        let wonButtonsContainer = $('.won-buttons-container');
        wonButtonsContainer.remove();

        if(playersList.length > playersIndex) {
            playersIndex++

            mouseClick($(playersList[playersIndex]));
            $(playersList[playersIndex]).click()
    
            mouseClick($(playersCallToAction[playersIndex]));
            $(playersCallToAction[playersIndex]).click()
        }
    }, 'won')

    playerExpiredStatus = observeDOMAddedClass(observedContainer[0], () => {
        console.log('observeDOMAddedClass EXPIRED')
        if(playersList.length > playersIndex) {
            playersIndex++

            mouseClick($(playersList[playersIndex]));
            $(playersList[playersIndex]).click()
    
            mouseClick($(playersCallToAction[playersIndex]));
            $(playersCallToAction[playersIndex]).click()
        }
    }, 'expired')

    $('.listFUTItem .rowContent.has-tap-callback').on('click', function() {
        $('.rowContent.has-tap-callback').removeClass('active');
        $(this).addClass('active');
        buyButton.removeClass('disabled');
        buyButton.removeAttr('disabled');
        buyButton.removeProp('disabled');
        buyButton.prop('disabled', false);
        buyButton.attr('disabled', false);

        let prices = ($(this).find($('.currency-coins.value')));
        price = $(prices[2]).html();

        buyButton.html('Buy Now for ' + price)
    })
    
    $('.listFUTItem').on('click', function() {
        $('.listFUTItem').removeClass('selected');
        $(this).addClass('selected');
        buyButton.removeClass('disabled');
        buyButton.removeAttr('disabled');
        buyButton.removeProp('disabled');
        buyButton.prop('disabled', false);
        buyButton.attr('disabled', false);
    })

    buyButton.on('click', () => {
        generateModal(price);
    })

    function sendToClub() {
        $(playersList[playersIndex]).remove();
    }

    function generateModal(price) {
        const modal = 
        `<div class="view-modal-container form-modal">
            <section class="Dialog ui-dialog-type-message" style="min-width: 300px;">
                <header>
                    <h1 class="dialog-title">Buy Now</h1>
                </header>
                <div class="dialog-body">
                    <p class="dialog-msg">Are you sure you want to buy this item for ${price} coins?</p>
                    <div class="ut-button-group">
                        <button>
                            <span class="btn-text">Ok</span>
                            <span class="btn-subtext"></span>
                        </button>
                        <button>
                            <span class="btn-text">Cancel</span>
                            <span class="btn-subtext"></span>
                        </button>
                    </div>
                </div>
            </section>
        </div>`;

        return $('main').append(modal);
    }

    function generateWonButtons() {
        const wonButtons = 
        `<div class="won-buttons-container">
            <button class="more">
                <span class="btn-text">Player Bio</span>
                <span class="btn-subtext"></span>
            </button>
            <button style="display: none;">
                <span class="btn-text"></span>
                <span class="btn-subtext"></span>
            </button>
            <button style="display: none;">
                <span class="btn-text">Apply Consumable</span>
                <span class="btn-subtext"></span>
            </button>
            <button style="display: none;">
                <span class="btn-text">Make Item Active</span>
                <span class="btn-subtext"></span>
            </button>
            <button>
                <span class="btn-text">Send to My Club</span>
                <span class="btn-subtext"></span>
            </button>
            <button>
                <span class="btn-text">Send to Active Squad</span>
                <span class="btn-subtext"></span>
            </button>
            <button>
                <span class="btn-text">Send to Transfer List</span>
                <span class="btn-subtext"></span>
            </button>
            <button>
                <span class="btn-text">Compare Price</span>
                <span class="btn-subtext"></span>
            </button>
            <button>
                <span class="btn-text">Quick Sell</span>
                <span class="btn-subtext currency-coins">300</span>
            </button>
        </div>`;

        return buttonsPanel.append(wonButtons);
    }

    function removeModal() {
        let modalContainer = $('.view-modal-container.form-modal');

        modalContainer.remove();
    }
    // Click en buyNow/Siguiente jugador dependiendo del estado del botton de buyNow
    buyButtonStatusAction = observeDOMAddedClass(observedContainer[0], () => {
        if(buyButton.attr('disabled') && buyButton.hasClass('disabled')) {
            if(playersList.length > playersIndex) {
                playersIndex++;
                mouseClick($(playersList[playersIndex]));
                $(playersList[playersIndex]).click();
        
                mouseClick($(playersCallToAction[playersIndex]));
                $(playersCallToAction[playersIndex]).click();
            }
        } else {
            mouseClick(buyButton);
            buyButton.click();
        }
    }, 'selected');

    console.log($(playersList[1]));
    console.log(playersList[1].length);

    function log(msg, line) {
        if(msg) {
            const index = loggedItems.findIndex(element => element.value === msg)
            if (index >= 0) {
                loggedItems[index].count += 1;
            } else {
                loggedItems.push({
                count: 1,
                value: msg,
                line: line
                });
            }
        } else {
            new Error(`error on line ${line}`);
        }
    }
    
    console.log($('.buyButton').prop('disabled'));
    console.log($('.buyButton').hasClass('disabled'));

    function init() {
        // if(playersList.length === 0 || playersList.length === -1) {
            // Hacer click en back
            // return;
        // }
        if(buyButton.attr('disabled') && buyButton.hasClass('disabled')) {
            if(playersList.length > playersIndex) {
                playersIndex++
    
                mouseClick($(playersList[playersIndex]));
                $(playersList[playersIndex]).click()
        
                mouseClick($(playersCallToAction[playersIndex]));
                $(playersCallToAction[playersIndex]).click()
            }
        } else {
            mouseClick(buyButton);
            buyButton.click()
        }
    }

    // init();
};

module.exports = Header;

// Sniping Tool

// click en search
// Seteo de index = 0; - LISTO
// Seteo de lista de items - LISTO
// Seteo de cantidad de monedas - LISTO
// DOM observer para lista de jugadores - Aca no se genera dinamicamente
// click en listFUTItem con index - LISTO: Funcion init para el click en el primer item y en el boton de buy now por primera vez
// Dom Obs que registra el cambio de clase del jugador y hace click en Buy now. Si el boton esta desabilitado, se hace click en el siguiente index
// Dom Obs que regitre apariciion de box de confirmacion de Buy now y haga click en OK
// Dom Obs que registre aparicion de boton de enviar al club y haga click en este boton
// Dom Obs que registre el remove del listFUTItem y hace click en el siguiente item
// Dom Obs para actulizacion de cantidad de monedas

