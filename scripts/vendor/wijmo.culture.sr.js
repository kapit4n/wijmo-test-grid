﻿/*
    *
    * Wijmo Library 5.20183.568
    * http://wijmo.com/
    *
    * Copyright(c) GrapeCity, Inc.  All rights reserved.
    *
    * Licensed under the GrapeCity Commercial License.
    * sales@wijmo.com
    * wijmo.com/products/wijmo-5/license/
    *
    */
/*
 * Wijmo culture file: sr-Latn (Serbian (Latin))
 */
var wijmo;
(function (wijmo) {
    // process the scenario where "wijmo" !== "window['wijmo']", for example when culture file is loaded
    // using 'import' statement in a WebPack bundled app, where "wijmo" will be local to this module.
    if (!window['wijmo']) {
        window['wijmo'] = wijmo;
    }
    wijmo.culture = window['wijmo'].culture = {
        Globalize: {
            name: 'sr-Latn',
            displayName: 'Serbian (Latin)',
            numberFormat: {
                '.': ',',
                ',': '.',
                '-': '-',
                '+': '+',
                '%': '%',
                percent: { pattern: ['-n%', 'n%'] },
                currency: { decimals: 0, symbol: 'RSD', pattern: ['-n $', 'n $'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['nedelja', 'ponedeljak', 'utorak', 'sreda', 'četvrtak', 'petak', 'subota'],
                daysAbbr: ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'],
                months: ['januar', 'februar', 'mart', 'april', 'maj', 'jun', 'jul', 'avgust', 'septembar', 'oktobar', 'novembar', 'decembar'],
                monthsAbbr: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'],
                am: ['pre podne', 'pre podne'],
                pm: ['po podne', 'po podne'],
                eras: ['n. e.'],
                patterns: {
                    d: 'd.M.yyyy.', D: 'dddd, dd. MMMM yyyy.',
                    f: 'dddd, dd. MMMM yyyy. HH:mm', F: 'dddd, dd. MMMM yyyy. HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'd. MMMM', M: 'd. MMMM',
                    y: 'MMMM yyyy.', Y: 'MMMM yyyy.',
                    g: 'd.M.yyyy. HH:mm', G: 'd.M.yyyy. HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        Licensing: {
            cls: 'ZATVORI',
            ctc: 'Molimo vas da kontaktirate GrapeCity: <a href="mailto:us.sales@grapecity.com">us.sales@grapecity.com</a>.',
            dmn: 'Licenca za Wijmo u ovoj aplikaciji nije važeći za trenutni domen. Domen licenca je <b>{licDomain}</b>; trenutni domen je  <b>{domain}</b>.',
            evl: 'Wijmo evaluacija verzija ({version})',
            exp: 'Licenca za Wijmo u ovoj aplikaciji je istekao. Datum prestanka važenja licence je <b>{expDate:d}</b>.',
            hdr: 'Wijmo dozvola',
            lic: 'Licenca za Wijmo u ovoj aplikaciji je nevažeći.',
            mss: 'Licenca za Wijmo u ovoj aplikaciji nije postavljena.',
            prd: 'Licenca za Wijmo u ovoj aplikaciji nije važeća za <b>{control}</b> kontrolu.',
            ver: 'Licenca za Wijmo u ovoj aplikaciji nije važeća za verziju u upotrebi. Licenca verzija je <b>{licVer}</b>; verzija proizvoda je  <b>{version}</b>.'
        },
        Calendar: {
            ariaLabels: {
                calendar: 'Kalendar',
                monthView: 'Mesečni prikaz',
                yearView: 'Prikaz godine',
                prvMo: 'Prethodni mesec',
                today: 'Danas',
                nxtMo: 'Sledećeg meseca',
                prvYr: 'Prethodna godina',
                currMo: 'Tekući mesec',
                nxtYr: 'Sledeće godine',
            }
        },
        DropDown: {
            ariaLabels: {
                tgl: 'Uključi/isključi padajuću listu'
            }
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} stavke)',
            ariaLabels: {
                toggleDropDown: 'Uključi/isključi padajuću listu',
                toggleGroup: 'Uključi/isključi grupa'
            }
        },
        FlexGridDetailProvider: {
            ariaLabels: {
                toggleDetail: 'Uključi/isključi red detalj'
            }
        },
        FlexGridFilter: {
            // aria labels
            ariaLabels: {
                edit: 'Uređivanje filtera za kolonu',
                dialog: 'Urednik filtera za kolonu',
                asc: 'Kolone za sortiranje po rastućem redosledu',
                dsc: 'Sortiranje kolona u silazno',
                search: 'Lista artikala za pretragu',
                op1: 'Prvi Operator uslova',
                val1: 'Prvi uslov vrednost',
                and: 'Zahtevaju oba uslova',
                or: 'Zahteva u svakom stanju',
                op2: 'Drugi Operator uslova',
                val2: 'Drugi uslov vrednost'
            },
            // filter
            ascending: '\u2191 Rastuće',
            descending: '\u2193 Opadajuće',
            apply: 'Primeni',
            cancel: 'Otkaži',
            clear: 'Obriši',
            conditions: 'Filtriraj prema uslovu',
            values: 'Filtriraj prema vrednosti',
            // value filter
            search: 'Traži',
            selectAll: 'Izaberi sve',
            null: '(ništa)',
            // condition filter
            header: 'Prikaži stavke gde je vredbnost',
            and: 'I',
            or: 'Ili',
            stringOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Nije jednako', op: 1 },
                { name: 'Počinje sa', op: 6 },
                { name: 'Završava sa', op: 7 },
                { name: 'Sadrži', op: 8 },
                { name: 'Ne sadrži', op: 9 }
            ],
            numberOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Nije jednako', op: 1 },
                { name: 'Veće od', op: 2 },
                { name: 'Veće od ili jednako', op: 3 },
                { name: 'Manje od', op: 4 },
                { name: 'Manje od ili jednako', op: 5 }
            ],
            dateOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Pre', op: 4 },
                { name: 'Posle', op: 2 }
            ],
            booleanOperators: [
                { name: '(nije postavljeno)', op: null },
                { name: 'Jednako', op: 0 },
                { name: 'Nije jednako', op: 1 }
            ]
        },
        InputDateTime: {
            ariaLabels: {
                tglDate: 'Uključi/isključi kalendar',
                tglTime: 'Uključi/isključi put lista'
            }
        },
        InputNumber: {
            ariaLabels: {
                incVal: 'Povećajte vrednost',
                decVal: 'Smanjite vrednosti'
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} stavki odabrano',
            selectAll: 'Izaberi sve'
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Postavke polja:',
                header: 'Zaglav.:',
                summary: 'Rezime:',
                showAs: 'Predstaviti kao:',
                weighBy: 'Teћi od strane:',
                sort: 'Sortiraj:',
                filter: 'Filter za:',
                format: 'Oblikovanje:',
                sample: 'Uzorak:',
                edit: 'Uredi…',
                clear: 'Obriši',
                ok: 'U redu',
                cancel: 'Otkaži',
                none: '(nijedno)',
                sorts: {
                    asc: 'Rastući redosled',
                    desc: 'Opadajući redosled'
                },
                aggs: {
                    sum: 'Zbir',
                    cnt: 'Broj',
                    avg: 'Prosek',
                    max: 'Maksimum',
                    min: 'MIN',
                    rng: 'Opseg',
                    std: 'StdDev',
                    var: 'VAR',
                    stdp: 'StdDevPop',
                    varp: 'VarPop',
                    first: 'prvi',
                    last: 'Poslednji'
                },
                calcs: {
                    noCalc: 'Bez izračunavanja',
                    dRow: 'Razliku u odnosu na prethodni red',
                    dRowPct: '% Razlika od prethodni red',
                    dCol: 'Razliku iz prethodne kolone',
                    dColPct: '% Razlika iz prethodne kolone',
                    dPctGrand: '% od konačnog zbira',
                    dPctRow: '% reda ukupno',
                    dPctCol: '% Ukupni kolone',
                    dRunTot: 'Rastući zbir',
                    dRunTotPct: '% tekućeg zbira'
                },
                formats: {
                    n0: 'Ceo broj (n0)',
                    n2: 'Decimal (n2)',
                    c: 'Valuta (c)',
                    p0: 'Procenat (p0)',
                    p2: 'Procenat (p2)',
                    n2c: 'Na hiljade (n2,)',
                    n2cc: 'Milioni (n2,,)',
                    n2ccc: 'Milijarde (n2,,,)',
                    d: 'Datum (d)',
                    MMMMddyyyy: 'Mesec dana godina (MMMM dd, yyyy)',
                    dMyy: 'Godine mesec dana (d/M/yy)',
                    ddMyy: 'Godine mesec dana (dd/M/yy)',
                    dMyyyy: 'Godine mesec dana (dd/M/yyyy)',
                    MMMyyyy: 'Mesec godina (MMM yyyy)',
                    MMMMyyyy: 'Mesec godina (MMMM yyyy)',
                    yyyyQq: 'Kvartal godine (yyyy "Q" q)',
                    FYEEEEQU: 'Kvartal fiskalne godine ("FY"EEEE "Q"U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Sveukupno',
                subTotal: 'Međuvrednost'
            },
            PivotPanel: {
                fields: 'Odaberite polja da biste dodali izveštaj:',
                drag: 'Prevlačite polja sa jedne na drugu oblast ispod:',
                filters: 'Filteri',
                cols: 'Kolone',
                rows: 'Redovi',
                vals: 'Vrednosti',
                defer: 'Odgodim ispravke',
                update: 'Ažuriraj'
            },
            _ListContextMenu: {
                up: 'Premesti nagore',
                down: 'Premesti nadole',
                first: 'Premesti na početak',
                last: 'Premesti na kraj',
                filter: 'Premesti u filter izveštaja',
                rows: 'Premesti u oznake redova',
                cols: 'Premesti u oznake kolona',
                vals: 'Premesti u vrednosti',
                remove: 'Ukloni polje',
                edit: 'Postavke polja…',
                detail: 'Predstavljanje detalja…'
            },
            PivotChart: {
                by: 'po',
                and: 'i'
            },
            DetailDialog: {
                header: 'Prikaz detalja:',
                ok: 'U redu',
                items: '{cnt:n0} stavki',
                item: '{cnt} artikla',
                row: 'Red',
                col: 'Kolona'
            },
            Slicer: {
                multiSelect: 'Višestruki izbor',
                clearFilter: 'Obriši Filter'
            }
        },
        Viewer: {
            cancel: 'Otkaži',
            ok: 'U redu',
            bottom: 'Donja:',
            top: 'Najbolji:',
            right: 'Desna:',
            left: 'Leva:',
            margins: 'Margine (u inčima)',
            orientation: 'Položaj:',
            paperKind: 'Vrsta papira:',
            pageSetup: 'Podešavanje parametara stranice',
            landscape: 'Položeno',
            portrait: 'Uspravno',
            pageNumber: 'Broj stranice',
            zoomFactor: 'Faktor zumiranja',
            paginated: 'Raspored štampanja',
            print: 'Odštampaj',
            search: 'Traži',
            matchCase: 'Podudari slova',
            wholeWord: 'Podudaranje samo celih reči',
            searchResults: 'Rezultati pretrage',
            previousPage: 'Prethodna stranica',
            nextPage: 'Sledeća stranica',
            firstPage: 'Prva stranica',
            lastPage: 'Poslednja stranica',
            backwardHistory: 'nazad',
            forwardHistory: 'Napred',
            pageCount: 'Broj stranica',
            selectTool: 'Alatke za izbor',
            moveTool: 'Alatka za potez',
            continuousMode: 'Kontinuirani prikaz stranice',
            singleMode: 'Prikaz jedne stranice',
            wholePage: 'Fit čitava stranica',
            pageWidth: 'Prilagodi širinu stranice',
            zoomOut: 'Smanji',
            zoomIn: 'Povećaj',
            rubberbandTool: 'Zoom izborom',
            magnifierTool: 'Lupa',
            rotatePage: 'Rotacija stranica',
            rotateDocument: 'Rotacija dokument',
            exports: 'Izvezi',
            fullScreen: 'Ceo ekran',
            exitFullScreen: 'Izađi iz režima celog ekrana',
            hamburgerMenu: 'Alatke',
            showSearchBar: 'Prikaz trake za pretraživanje',
            viewMenu: 'Opcije rasporeda',
            searchOptions: 'Opcije pretraživanja',
            matchCaseMenuItem: 'Podudaranje malih i velikih slova',
            wholeWordMenuItem: 'Podudaranje celu reč',
            thumbnails: 'Sličice stranica',
            outlines: 'Mapa dokumenta',
            loading: 'Učitavanje…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Open XML Word',
            xlsxExportName: 'Open XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Web arhiva (MHTML)',
            htmlExportName: 'HTML dokument',
            rtfExportName: 'RTF dokument',
            metafileExportName: 'Komprimovane metadatoteke',
            csvExportName: 'CSV',
            tiffExportName: 'TIFF slika',
            bmpExportName: 'BMP slike',
            emfExportName: 'Poboljšana metadatoteka',
            gifExportName: 'GIF slike',
            jpgExportName: 'JPEG slike',
            jpegExportName: 'JPEG slike',
            pngExportName: 'PNG slika',
            abstractMethodException: 'Ovo je apstraktna metod, molim vas da ga sprovedu.',
            cannotRenderPageNoViewPage: 'Ne mogu da bi prikazao stranicu bez izvornog dokumenta i prikaz stranice.',
            cannotRenderPageNoDoc: 'Ne mogu da bi prikazao stranicu bez izvornog dokumenta i prikaz stranice.',
            exportFormat: 'Format za izvoz:',
            exportOptionTitle: 'Opcije izvoza',
            documentRestrictionsGroup: 'Dokument ograničenja',
            passwordSecurityGroup: 'Bezbednost lozinke',
            outputRangeGroup: 'Izlazni opseg',
            documentInfoGroup: 'Informacije o dokumentu',
            generalGroup: 'Opšte',
            docInfoTitle: 'Naslov',
            docInfoAuthor: 'Autor',
            docInfoManager: 'Menadžer',
            docInfoOperator: 'Operator',
            docInfoCompany: 'Preduzeće',
            docInfoSubject: 'Tema',
            docInfoComment: 'Komentarisanje',
            docInfoCreator: 'Autor',
            docInfoProducer: 'Producent',
            docInfoCreationTime: 'Datum nastanka',
            docInfoRevisionTime: 'Revizija vremena',
            docInfoKeywords: 'Ključne reči',
            embedFonts: 'Ugradi TrueType fontove',
            pdfACompatible: 'Kompatibilan sa PDF/A (nivoa 2B)',
            useCompression: 'Koristi komprimovanje',
            useOutlines: 'Generisanje obrise',
            allowCopyContent: 'Dozvoli sadržaja kopiranje ili vađenje',
            allowEditAnnotations: 'Omogućavanje uređivanja primjedbi',
            allowEditContent: 'Omogućavanje uređivanja sadržaja',
            allowPrint: 'Dozvoljavaju štampanje',
            ownerPassword: 'Dozvole (vlasnik) lozinka:',
            userPassword: 'Dokument otvori (korisnik) lozinka:',
            encryptionType: 'Nivo šifriranja:',
            paged: 'Na disku',
            showNavigator: 'Prikaži Navigator',
            navigatorPosition: 'Navigator pozicija',
            singleFile: 'Jednu datoteku',
            tolerance: 'Tolerancija, kada otkrivanje granice teksta (tačke):',
            pictureLayer: 'Koristi zasebna slika sloj',
            metafileType: 'Metafile tip:',
            monochrome: 'Monohromatska',
            resolution: 'Rezolucija:',
            outputRange: 'Opseg stranica:',
            outputRangeInverted: 'Preokrenuto',
            showZoomBar: 'Traka za zumiranje',
            searchPrev: 'Prethodna pretraga',
            searchNext: 'Pretraži dalje',
            checkMark: '\u2713',
            exportOk: 'Izvoz…',
            cannotSearch: 'Traži zahteva izvor dokumenta da se navedene.',
            parameters: 'Parametri',
            requiringParameters: 'Unesite parametre.',
            nullParameterError: 'Vrednost ne može biti „null“.',
            invalidParameterError: 'Nevažeći unos.',
            parameterNoneItemsSelected: '(nijedno)',
            parameterAllItemsSelected: '(sve)',
            parameterSelectAllItemText: '(Izaberi sve)',
            selectParameterValue: '(izaberite vrednost)',
            apply: 'Primeni',
            errorOccured: 'Došlo je do greške.'
        },
        FlexSheet: {
            insertRow: 'Umetni red',
            deleteRow: 'Izbriši red',
            insertCol: 'Umetni kolonu',
            deleteCol: 'Delete Column',
            convertTable: 'Konvertovanje tabele',
            copyCells: 'Kopiranje ćelija',
            fillSeries: 'Popuniti seriju',
            fillFormat: 'Oblikovati samo popunu',
            fillWithoutFormat: 'Popuniti bez oblikovanja'
        }
    };
    var updc = window['wijmo']._updateCulture;
    if (updc) {
        updc();
    }
})(wijmo || (wijmo = {}));
;

