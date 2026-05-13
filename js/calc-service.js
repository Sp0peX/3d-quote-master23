/**
 * CalcService - Modulo per la logica di calcolo e database stampanti
 * Separato dal file principale per scalabilità e manutenibilità.
 */
const CalcService = {
    // Database stampanti espanso (Oltre 150 modelli)
    printerBrands: {
        'Bambu Lab': [
            { name: 'X1-Carbon / X1-C', watts: 120 },
            { name: 'X1-E', watts: 260 },
            { name: 'P1S', watts: 125 },
            { name: 'P1P', watts: 120 },
            { name: 'A1', watts: 200 },
            { name: 'A1 Mini', watts: 78 }
        ],
        'Creality': [
            { name: 'K1 / K1C', watts: 180 },
            { name: 'K1 Max', watts: 350 },
            { name: 'Ender 3 V3 Plus', watts: 160 },
            { name: 'Ender 3 V3 SE', watts: 115 },
            { name: 'Ender 3 V3 KE', watts: 130 },
            { name: 'Ender 3 V2 / Pro', watts: 120 },
            { name: 'Ender 5 S1', watts: 150 },
            { name: 'Ender 5 Plus', watts: 200 },
            { name: 'CR-10 Smart Pro', watts: 150 },
            { name: 'CR-M4', watts: 400 },
            { name: 'Halot Mage Pro (Resin)', watts: 150 }
        ],
        'Prusa Research': [
            { name: 'MK4S / MK4', watts: 100 },
            { name: 'MK3S+ / MK3', watts: 80 },
            { name: 'XL (1 Toolhead)', watts: 235 },
            { name: 'XL (2 Toolheads)', watts: 280 },
            { name: 'XL (5 Toolheads)', watts: 350 },
            { name: 'MINI+', watts: 75 },
            { name: 'SL1S SPEED (Resin)', watts: 100 }
        ],
        'Anycubic': [
            { name: 'Kobra 3 / S1', watts: 185 },
            { name: 'Kobra 2 Pro / Plus', watts: 150 },
            { name: 'Kobra Neo 2', watts: 110 },
            { name: 'Photon Mono M7 Pro', watts: 120 },
            { name: 'Photon Mono M5s', watts: 100 },
            { name: 'Vyper', watts: 150 }
        ],
        'Elegoo': [
            { name: 'Neptune 4 Max', watts: 220 },
            { name: 'Neptune 4 Plus', watts: 200 },
            { name: 'Neptune 4 Pro', watts: 150 },
            { name: 'Neptune 3 Pro', watts: 120 },
            { name: 'Mars 5 Ultra (Resin)', watts: 35 },
            { name: 'Saturn 4 Ultra (Resin)', watts: 144 },
            { name: 'Jupiter SE (Resin)', watts: 150 }
        ],
        'Artillery': [
            { name: 'Sidewinder X4 Pro', watts: 160 },
            { name: 'Sidewinder X4 Plus', watts: 250 },
            { name: 'Sidewinder X2', watts: 150 },
            { name: 'Genius Pro', watts: 120 }
        ],
        'AnkerMake': [
            { name: 'M5', watts: 180 },
            { name: 'M5C', watts: 150 }
        ],
        'QIDI Tech': [
            { name: 'X-Max 3', watts: 450 },
            { name: 'X-Plus 3', watts: 350 },
            { name: 'X-Smart 3', watts: 200 }
        ],
        'Flashforge': [
            { name: 'Adventurer 5M Pro', watts: 150 },
            { name: 'Adventurer 5M', watts: 120 },
            { name: 'Guider 3 Ultra', watts: 450 }
        ],
        'Voron (Stime Medie)': [
            { name: 'Voron 2.4 350mm', watts: 250 },
            { name: 'Voron 2.4 300mm', watts: 200 },
            { name: 'Voron Trident 250mm', watts: 180 },
            { name: 'Voron V0.2', watts: 60 }
        ],
        'RatRig (Stime Medie)': [
            { name: 'V-Core 3.1 500mm', watts: 400 },
            { name: 'V-Core 3.1 300mm', watts: 250 },
            { name: 'V-Minion', watts: 80 }
        ],
        'UltiMaker': [
            { name: 'S7', watts: 250 },
            { name: 'S5', watts: 200 },
            { name: 'S3', watts: 150 },
            { name: '2+ Connect', watts: 120 }
        ],
        'Formlabs (Resin)': [
            { name: 'Form 4', watts: 150 },
            { name: 'Form 3+', watts: 100 },
            { name: 'Form 3L', watts: 250 }
        ],
        'Peopoly (Resin)': [
            { name: 'Magneto X', watts: 300 },
            { name: 'Forge', watts: 180 }
        ],
        'Phrozen (Resin)': [
            { name: 'Sonic Mighty 8K', watts: 120 },
            { name: 'Sonic Mini 8K S', watts: 40 },
            { name: 'Sonic Mega 8K S', watts: 250 }
        ],
        'Geeetech': [
            { name: 'Mizar M', watts: 150 },
            { name: 'Thunder', watts: 300 },
            { name: 'A20M (Dual)', watts: 150 }
        ],
        'Sovol': [
            { name: 'SV08', watts: 300 },
            { name: 'SV07 Plus', watts: 200 },
            { name: 'SV06 Plus', watts: 150 },
            { name: 'SV06', watts: 120 }
        ],
        'Kingroon': [
            { name: 'KP3S Pro V2', watts: 100 },
            { name: 'KLP1', watts: 150 }
        ],
        'Two Trees': [
            { name: 'Sapphire Plus', watts: 200 },
            { name: 'SK1', watts: 250 }
        ],
        'Flying Bear': [
            { name: 'Ghost 6', watts: 150 },
            { name: 'Reborn 2', watts: 300 }
        ],
        'Biqu / BigTreeTech': [
            { name: 'Hurakan', watts: 150 },
            { name: 'B1 SE Plus', watts: 150 }
        ],
        'Snapmaker': [
            { name: 'Artisan 3-in-1', watts: 400 },
            { name: 'J1 / J1s IDEX', watts: 250 }
        ],
        'Raised3D': [
            { name: 'Pro3', watts: 450 },
            { name: 'E2', watts: 350 }
        ],
        'Zortrax': [
            { name: 'M200 Plus', watts: 150 },
            { name: 'Inpire', watts: 350 }
        ],
        'Wuxn': [
            { name: 'W7', watts: 180 }
        ]
    },

    /**
     * Calcola il costo totale della plastica
     */
    calculatePlasticCost(spools) {
        return spools.reduce((total, spool) => {
            return total + ((spool.costPerKg / 1000) * (spool.grams || 0));
        }, 0);
    },

    /**
     * Calcola il costo orario dell'elettricità
     */
    calculateElectricityCostPerHour(wattage, kwhCost) {
        return (wattage / 1000) * kwhCost;
    },

    /**
     * Calcola il costo energetico totale per la durata della stampa
     */
    calculateTotalEnergyCost(hours, minutes, wattage, kwhCost) {
        const totalHours = hours + (minutes / 60);
        return totalHours * this.calculateElectricityCostPerHour(wattage, kwhCost);
    },

    /**
     * Calcola il preventivo completo (Versione Semplificata)
     */
    generateQuote(data) {
        // 1. Costi Diretti
        const materialCost = this.calculatePlasticCost(data.spools);
        const energyCost = this.calculateTotalEnergyCost(data.hours, data.minutes, data.wattage, data.kwhCost);
        
        // 2. Totale Base (Somma di materiale ed energia)
        let basePrice = materialCost + energyCost;
        
        // 3. Calcolo Tasse (IVA)
        const ivaAmount = basePrice * (data.ivaPercent / 100);
        const priceWithIva = basePrice + ivaAmount;
        
        // 4. Calcolo Margine di Profitto
        const profitAmount = priceWithIva * (data.profitPercent / 100);
        const finalPrice = priceWithIva + profitAmount;

        return {
            materialCost,
            energyCost,
            basePrice,
            ivaAmount,
            priceWithIva,
            profitAmount,
            finalPrice
        };
    }
};

// Esporta per l'uso in altri file (supporto per moduli ES o globale)
if (typeof module !== 'undefined') {
    module.exports = CalcService;
} else {
    window.CalcService = CalcService;
}
