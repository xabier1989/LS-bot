// ==UserScript==
// @name         LS Farmer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Farming Ladder Slasher
// @author       Xabi
// @match        https://ladderslasher.d2jsp.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

const screenCheckTime = 50;

const chickenPercentage = 10;
const minLevelWhite = 45;

const maxOccupiedSlots = 7;
const maxEssenceSlots = 16;

const enabledSpecialDrops = true;

const transmutableDrops = [
    { 'skill': 0, 'minLevel': 0, 'maxLevel': 0, 'minLowMagical': 1, 'maxLowMagical': 2, 'minHighMagical': 1, 'maxHighMagical': 2 },
    { 'skill': 1, 'minLevel': 0, 'maxLevel': 0, 'minLowMagical': 1, 'maxLowMagical': 4, 'minHighMagical': 1, 'maxHighMagical': 4 },
    { 'skill': 2, 'minLevel': 0, 'maxLevel': 1, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 3, 'minLevel': 0, 'maxLevel': 1, 'minLowMagical': 3, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 4, 'minLevel': 1, 'maxLevel': 1, 'minLowMagical': 1, 'maxLowMagical': 5, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 5, 'minLevel': 1, 'maxLevel': 1, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 6, 'minLevel': 1, 'maxLevel': 2, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 7, 'minLevel': 1, 'maxLevel': 2, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 8, 'minLevel': 2, 'maxLevel': 2, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 9, 'minLevel': 2, 'maxLevel': 2, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 10, 'minLevel': 2, 'maxLevel': 3, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 11, 'minLevel': 2, 'maxLevel': 3, 'minLowMagical': 1, 'maxLowMagical': 5, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 12, 'minLevel': 2, 'maxLevel': 3, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 13, 'minLevel': 2, 'maxLevel': 4, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 14, 'minLevel': 2, 'maxLevel': 4, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 15, 'minLevel': 2, 'maxLevel': 4, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 16, 'minLevel': 3, 'maxLevel': 5, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 17, 'minLevel': 3, 'maxLevel': 5, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 18, 'minLevel': 3, 'maxLevel': 5, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 19, 'minLevel': 3, 'maxLevel': 5, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 7 },
    { 'skill': 20, 'minLevel': 3, 'maxLevel': 5, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 9 },
    { 'skill': 21, 'minLevel': 3, 'maxLevel': 6, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 22, 'minLevel': 3, 'maxLevel': 6, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 23, 'minLevel': 3, 'maxLevel': 6, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 24, 'minLevel': 3, 'maxLevel': 6, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 25, 'minLevel': 3, 'maxLevel': 7, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 26, 'minLevel': 3, 'maxLevel': 7, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 27, 'minLevel': 3, 'maxLevel': 7, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 28, 'minLevel': 3, 'maxLevel': 7, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 29, 'minLevel': 3, 'maxLevel': 8, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 30, 'minLevel': 3, 'maxLevel': 8, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 31, 'minLevel': 3, 'maxLevel': 8, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 32, 'minLevel': 3, 'maxLevel': 8, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 33, 'minLevel': 3, 'maxLevel': 9, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 34, 'minLevel': 3, 'maxLevel': 9, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 35, 'minLevel': 3, 'maxLevel': 9, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 36, 'minLevel': 3, 'maxLevel': 9, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 37, 'minLevel': 3, 'maxLevel': 10, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 38, 'minLevel': 3, 'maxLevel': 10, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 39, 'minLevel': 3, 'maxLevel': 10, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 40, 'minLevel': 3, 'maxLevel': 10, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 41, 'minLevel': 3, 'maxLevel': 11, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 42, 'minLevel': 3, 'maxLevel': 11, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 43, 'minLevel': 3, 'maxLevel': 11, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 44, 'minLevel': 3, 'maxLevel': 11, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 45, 'minLevel': 3, 'maxLevel': 12, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 46, 'minLevel': 3, 'maxLevel': 12, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 47, 'minLevel': 3, 'maxLevel': 12, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 48, 'minLevel': 3, 'maxLevel': 12, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 49, 'minLevel': 3, 'maxLevel': 13, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 50, 'minLevel': 3, 'maxLevel': 13, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 51, 'minLevel': 3, 'maxLevel': 13, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 52, 'minLevel': 3, 'maxLevel': 13, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 },
    { 'skill': 53, 'minLevel': 3, 'maxLevel': 14, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 1 },
    { 'skill': 54, 'minLevel': 3, 'maxLevel': 14, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 3 },
    { 'skill': 55, 'minLevel': 3, 'maxLevel': 14, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 5 },
    { 'skill': 56, 'minLevel': 3, 'maxLevel': 14, 'minLowMagical': 1, 'maxLowMagical': 15, 'minHighMagical': 1, 'maxHighMagical': 15 }
];

const essencePrices = [
    { 'tier': 1, 'prices': [0.03, 0.03, 0.08, 0.13, 0.25, 0.33, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5] },
    { 'tier': 2, 'prices': [0.1, 0.1, 0.15, 0.25, 0.5, 0.65, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0] },
    { 'tier': 3, 'prices': [0.2, 0.2, 0.3, 0.5, 1.0, 1.25, 1.5, 2.0, 2.0, 2.0, 2.0, 2.0] },
    { 'tier': 4, 'prices': [0.4, 0.5, 0.7, 1.0, 1.5, 2.0, 2.5, 2.0, 2.5, 2.5, 2.5, 2.5] },
    { 'tier': 5, 'prices': [0.7, 0.8, 1.0, 1.5, 2.25, 3.0, 4.25, 6.0, 6.0, 6.0, 6.0, 6.0] },
    { 'tier': 6, 'prices': [1.0, 1.2, 1.5, 2.0, 3.25, 5.0, 7.25, 9.0, 9.0, 9.0, 9.0, 9.0] }
];

let nextAttackTime = 0;
let nextEngage = 0;

let lastMonsterAmount = 0;
let lastMovement = 0;
let recoveryFinished = 0;

let easyModeEnabled = false;

let playerTransmuting = 0;

let goldPassword = undefined;

(async function() {
    'use strict';

    // Prevent the PC being suspended
    navigator.wakeLock.request();

    // Get the gold password
    goldPassword = localStorage.getItem('gold-password');

    // Wait for the script to start
    await sleep(screenCheckTime);

    // Check for the current screen
    checkCurrentScreen();
})();

async function checkCurrentScreen() {
    if (document.querySelectorAll('div.logoWrap').length > 0) {
        // Reset the variables
        initializeVariables();

        // Make the player login
        document.querySelectorAll('a.abutGradBl.lButton')[0].click();
    } else if (document.querySelectorAll('div.charList').length > 0) {
        // Reset the variables
        initializeVariables();

        // Select the first character
        document.querySelectorAll('div.charList > div.clChar')[0].click();

        // Wait for the screen to load
        await sleep(125);

        // Get the login button
        let loginButton = document.querySelectorAll('a.abutGradBl.clPlay');

        if (loginButton.length > 0) {
            // Make the character login
            document.querySelectorAll('a.abutGradBl.clPlay')[0].click();
        }
    } else {
        // Get the current time
        let currentTime = Date.now();

        if (!easyModeEnabled) {
            // Set the easy mode
            njs.sendData([1, 11, 1, 33, 100, "easy", 100, "1"]);
            easyModeEnabled = true;
        }

        if (isPlayerInCatacombs()) {
            // Check the catacomb actions
            await manageCatacombs(currentTime);
        } else if (isPlayerInTown()) {

            if (goldPassword !== undefined && goldPassword !== null && goldPassword.trim().length > 0) {
                // Sell the special items
                await sellSpecialItems();
            }

            if (recoveryFinished === 0) {
                // Get the player regeneration per second
                let playerRegenPerSecond = (1 + Math.floor(Plr.c[6] / 5) + Math.floor(Plr.c[18] / 25) + Plr.c[56][9]);

                // Get the amount of health to regenerate
                let healthRegenNeeded = Math.floor(Plr.c[20] * 0.75) - parseInt(Plr.c[22]);

                // Get the recovery time limit
                recoveryFinished = currentTime + (healthRegenNeeded / playerRegenPerSecond) * 1000;

                console.log('Recovery finishing at ' + new Date(recoveryFinished).toLocaleTimeString("es-ES"));
            }

            if (isEssenceInventoryFull()) {
                // Sell highest essence pack
                await sellHighestEssencePack();
            } else {
                // Get if there's any transmutable item
                let transmutableItem = getTransmutableItem();

                if (transmutableItem > 0 || playerTransmuting > 0) {
                    // Manage the transmuting
                    await manageTransmuting(currentTime, transmutableItem);
                } else if (playerTransmuting === 0 && currentTime > recoveryFinished) {
                    console.log('Start catacombs');

                    // Clear the recovery timer
                    recoveryFinished = 0;

                    do {
                        // Move the player to the catacombs
                        Cata.click();

                        // Wait for the catacombs to load
                        await sleep(15);

                    } while (!isPlayerInCatacombs());

                    // Hide the inventory
                    let inventoryPopUp = Inv.get();
                    if (inventoryPopUp) inventoryPopUp.del();

                    // Hide the market
                    let marketPopUp = Mkt.get();
                    if (marketPopUp) Mkt.tog();

                    // Wait for the player to be in the catacombs
                    await sleep(75);
                }
            }
        }
    }

    // Wait for the script to start
    await sleep(screenCheckTime);

    // Check for the current screen
    checkCurrentScreen();
}

function isPlayerInCatacombs() {
    // Check if the player is in the catacombs
    return document.querySelectorAll('div.mazeBox').length > 0;
}

function isPlayerInTown() {
    // Check if the player is in town
    return document.querySelectorAll('div.townWrap').length > 0;
}

async function manageCatacombs(currentTime) {
    // Check if the player has to kill monsters
    if (Cata.mobs) await killCatacombMonsters(currentTime);

    if (bg.maze !== undefined && bg.maze.shrine !== undefined && bg.maze.shrine !== null) {
        // Click on the shrine totem
        bg.maze.shrine.click();
    }

    if (getAliveMonsters() === 0 && currentTime > nextEngage) {
        // Engage the next wave
        engageNextWave(currentTime);

        // Set the new engage time
        nextEngage = currentTime + 450;
    }

    // Check if drops must be picked
    if (Object.keys(Drops.I).length > 0) retrieveDrops();

    // Check the conditions to leave the catacombs
    await checkPlayerHasToChicken();
}

async function killCatacombMonsters(currentTime) {
    // Check if the time passed between attacks
    if (nextAttackTime > currentTime) return;

    // Get the number of monsters
    lastMonsterAmount = getAliveMonsters();

    for (let i = 0; i < 3; i++) {

        if (Gs.absc[i] !== undefined && Gs.absc[i] !== null && parseInt(Gs.absc[i].o.innerText, 10) >= 75) {

            if (!Gs.absc[i].sel || parseInt(Gs.absc[i].sel) === 0) {
                // Select the ability for the next tick
                Gs.absc[i].down();
            }

            // Wait for the skill to be marked
            await sleep(15);

            break;
        }
    }

    for (let i = 0; i < Cata.mobs.length; i++) {
        // Check if the monster exists in the slot
        if (Cata.mobs[i] === undefined) continue;

        try {
            // Attack the monster
            Cbt.clickAttack(i);
        } catch (error) {
            // Show the error
            console.log('There was an error attacking the enemy: ' + error);
        }

        // Wait a random amount of time
        nextAttackTime = currentTime + getRandomValue(220, 500);

        break;
    }
}

function retrieveDrops() {

    Array.from(Object.keys(Drops.I)).forEach(i => {
        // Get the item given the identifier
        let droppedItem = Drops.I[i].item;

        if (isItemPickable(droppedItem) || isTransmutableDrop(droppedItem) || isSpecialDrop(droppedItem)) {
            // Pick the item
            Drops.I[i].down(new MouseEvent('click'));
        }
    });
}

async function goBackInTown() {

    do {
        // Retrieve the door
        let cataDoor = document.querySelectorAll('img.cataDoor.cp');

        if (cataDoor.length > 0) {
            // Try again to get out
            cataDoor[0].click();
        }

        // Wait for the next click
        await sleep(10);

    } while (!isPlayerInTown());

    // Clear the recovery timer
    recoveryFinished = 0;

    console.log('Player chicken due to: ' + (isInventoryFull() ? 'inventory full' : 'low health'));

    if (lastMonsterAmount > 3) {
        // Reset the maze
        njs.sendBytes(60, 5);

        // Set the easy mode
        njs.sendData([1, 11, 1, 33, 100, "easy", 100, "1"]);
    }
}

async function checkPlayerHasToChicken() {
    // Get the chicken health
    let chickenHealth = Math.round(chickenPercentage * Plr.c[20] / 100);

    if (isInventoryFull() || parseInt(Plr.c[22]) <= chickenHealth) {
        // Move the player to the town
        await goBackInTown();
    }
}

function isInventoryFull() {
    // Check if the inventory is full
    return Object.keys(Plr.items).filter(i => !Items.isEquipped(i) && !Items.hasQuantity(Plr.items[i])).length >= maxOccupiedSlots || isEssenceInventoryFull();
}

function isEssenceInventoryFull() {
    // Check if the essence inventory is full
    return Object.keys(Plr.items).filter(i => !Items.isEquipped(i) && Items.hasQuantity(Plr.items[i])).length >= maxEssenceSlots;
}

async function sellHighestEssencePack() {
    // Get the player essences
    let playerEssences = Object.keys(Plr.items).filter(i => !Items.isEquipped(i) && Items.hasQuantity(Plr.items[i])).sort((a, b) => Plr.items[b][8][16] - Plr.items[a][8][16]);

    for (let i = 0; i < playerEssences.length; i++) {
        // Get the essence item
        const essenceItem = Plr.items[playerEssences[i]];

        // Retrieve the level and magical for the essence
        const essenceLevel = parseInt(essenceItem[6]) + 1;
        const essenceMagic = parseInt(essenceItem[7]);

        // Check for any price coincidence
        const essenceSellPrice = essencePrices.find(e => parseInt(e.tier) === essenceLevel);

        if (essenceSellPrice !== undefined && essenceSellPrice !== null) {
            // Get the total price for the sell
            let marketPrice = essenceSellPrice.prices[essenceMagic] * parseInt(essenceItem[8][16]);

            if (parseFloat(marketPrice) < 1.0) {
                // The minimum sell price should be 1fg
                marketPrice = 1.0;
            }

            // Round the price
            const finalPrice = parseFloat(marketPrice.toString()).toFixed(2);

            if (!Mkt.get()) {
                // Show the market
                document.getElementById('townObj0').click();

                // Wait for the window to load
                await sleep(25);

                // Click the sell window
                document.querySelectorAll('div.njRBWrap.marketTabs')[0].children[1].click();
            }

            if (Object.entries(Mkt.I).length < 25) {
                // Place the item on the market
                Mkt.get().item.set(essenceItem);

                // Set the price
                document.getElementById('mkSellCost').value = finalPrice;
                document.getElementById('mkGpwd').value = goldPassword;

                // Wait for the text to load
                await sleep(25);

                // Submit the purchase
                document.getElementById('mkBuySell').click();

                // Wait for the next item
                await sleep(650);
            }

            break;
        }
    }
}

function isItemPickable(droppedItem) {
    // Check the item to be tier III minimum
    if (parseInt(droppedItem[6]) < 2) return false;

    // Check for the item's enhanced effect
    if (parseInt(droppedItem[8][0]) >= 50) return true;

    // Check for the item's intelligence
    if (parseInt(droppedItem[8][4]) >= 15) return true;

    // Check for the item's strength
    if (parseInt(droppedItem[8][1]) >= 15) return true;

    // Check for the item's dexterity
    if (parseInt(droppedItem[8][2]) >= 15) return true;

    // Check for the item's magic luck
    if (parseInt(droppedItem[8][8]) >= 9) return true;

    // Check for the item's extra slots
    if (parseInt(droppedItem[8][11]) >= 4) return true;

    // Check if the item has the minimum level
    if (Items.getLvlReq(droppedItem) >= minLevelWhite) return true;

    return false;
}

function isSpecialDrop(droppedItem) {
    // Check if special drops are enabled
    if (!enabledSpecialDrops) return false;

    if (Items.getLvlReq(droppedItem) >= 25 && Items.getLvlReq(droppedItem) <= 25 && droppedItem[7] > 0) return true;

    return false;
}

function isTransmutableDrop(droppedItem) {
    // Remove rods, essences and white items
    if (isItemPickable(droppedItem) || isSpecialDrop(droppedItem) || parseInt(droppedItem[7]) === 0 || parseInt(droppedItem[4]) === 4) return false;

    // Get the player transmuting skill level
    const mutingLevel = Plr.c[54][3] !== undefined ? parseInt(Plr.c[54][3][0]) : 0;

    // Get the skill level object
    let skillCaps = transmutableDrops.find(s => mutingLevel === s.skill);

    // Get the item level and magical
    const itemLevel = parseInt(droppedItem[6]);
    const itemMagic = parseInt(droppedItem[7]);

    // Check that the item meets the level restrictions
    if (itemLevel < skillCaps['minLevel'] || itemLevel > skillCaps['maxLevel']) return false;

    if (skillCaps['minLevel'] === skillCaps['maxLevel']) {
        // Check that the item meets the level requirements
        return itemLevel === skillCaps['minLevel'] && itemMagic >= skillCaps['minLowMagical'] && itemMagic <= skillCaps['maxLowMagical'];
    }

    if (itemLevel >= skillCaps['minLevel'] && itemLevel < skillCaps['maxLevel'] && itemMagic >= skillCaps['minLowMagical'] && itemMagic <= skillCaps['maxLowMagical']) return true;

    if (itemMagic >= skillCaps['minHighMagical'] && itemMagic <= skillCaps['maxHighMagical']) return true;

    return false;
}

function engageNextWave(currentTime) {

    try {
        // Engage the next wave
        Plr.autoPilot = 1;
        Cata.engage();
    } catch (error) {
        // Show the error on the console
        console.log('Error engaging the next wave: ' + error);
    } finally {

        if (currentTime > lastMovement) {
            // Set the last movement time
            lastMovement = currentTime + 650;

            if (!!Math.round(Math.random())) {
                // Move the player
                Maze.move(Math.round(Math.random()));
            }
        }
    }
}

async function sellSpecialItems() {
    // Get the inventory items
    let items = Object.keys(Plr.items).filter(i => !Items.isEquipped(i) && !Items.hasQuantity(Plr.items[i]));

    for (let i = 0; i < items.length; i++) {
        // Get the item given the identifier
        let selectedItem = Plr.items[items[i]];

        // Check if the item is a special drop
        if (!isSpecialDrop(selectedItem) || isTransmutableDrop(selectedItem) || isItemPickable(selectedItem)) continue;

        if (!Mkt.get()) {
            // Show the market
            document.getElementById('townObj0').click();

            // Wait for the window to load
            await sleep(25);

            // Click the sell window
            document.querySelectorAll('div.njRBWrap.marketTabs')[0].children[1].click();
        }

        if (Object.entries(Mkt.I).length < 25) {
            // Place the item on the market
            Mkt.get().item.set(selectedItem);

            // Set the price
            document.getElementById('mkSellCost').value = 1;
            document.getElementById('mkGpwd').value = goldPassword;

            // Wait for the text to load
            await sleep(25);

            // Submit the purchase
            document.getElementById('mkBuySell').click();

            // Wait for the next item
            await sleep(650);
        }
    }

}

async function manageTransmuting(currentTime, transmutableItemId) {

    if (!isTransmutingWindowOpened()) {
        // Show the transmuting window
        showTransmuting();

        // Reset the player transmuting
        playerTransmuting = 0;

        // Wait some time to load fine
        await sleep(25);

        return;
    }

    if (playerTransmuting > 0) {
        // Get the values for each bar
        let volValue = parseInt(document.querySelectorAll('div.meterBox.skillMeter > div.pa.meterBoxProg')[0].style.width, 10);

        // Get the clickable button
        let clickableButton = Array.from(document.querySelectorAll('a.abutGradBl.skBut')).find(el => el.textContent === (volValue >= 50 ? 'Stabilize' : 'Transmute'));

        if (clickableButton !== undefined && clickableButton !== null) {
            // Click the button
            clickableButton.click();

            // Wait for the results to show
            await sleep(25);
        }

        // Search for the finish button
        let finishButton = document.querySelectorAll('a.abutGradBl.skButDone');

        if (finishButton.length > 0) {
            console.log('Finished transmuting');
            // Click the button
            finishButton[0].click();

            // Wait for the game to start
            await sleep(150);

            // The transmute has been finished
            playerTransmuting = 0;
        }
    } else if (transmutableItemId > 0) {
        // Drop the item to the transmuting box
        pops.o[9].items[0].set(Plr.items[transmutableItemId]);

        // Click the button
        document.querySelectorAll('a.abutGradBl.skBut')[0].click();

        while (document.querySelectorAll('div.meterBox.skillMeter > div.pa.meterBoxProg').length === 0) {
            // Wait for the game to start
            await sleep(25);
        }

        // Start the transmuting
        playerTransmuting = transmutableItemId;

        console.log('Transmuting started: ' + Plr.items[transmutableItemId]);
    }
}

function getTransmutableItem() {
    // Initialize the item key
    let itemId = 0;

    Object.entries(Plr.items).forEach(([key, value]) => {

        if (!Items.isEquipped(key) && isTransmutableDrop(Plr.items[key])) {
            // Transmutable item found
            itemId = parseInt(key);
            return;
        }
    });

    return itemId;
}

function getAliveMonsters() {
    // Check if the catacombs are engaged
    if (!Cata.mobs) return 0;

    return Cata.mobs.filter(m => m !== undefined).length;
}

function isTransmutingWindowOpened() {
    // Check if there's any transmuting window opened
    return Array.from(document.querySelectorAll('div.popupTitle')).some(d => d.textContent === 'Transmuting');
}

function initializeVariables() {
    // Initialize the variables
    easyModeEnabled = false;
    playerTransmuting = 0;

    nextAttackTime = 0;
    nextEngage = 0;

    lastMonsterAmount = 0;
    lastMovement = 0;
    recoveryFinished = 0;
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
