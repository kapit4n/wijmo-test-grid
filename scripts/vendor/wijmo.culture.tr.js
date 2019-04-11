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
 * Wijmo culture file: tr (Turkish)
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
            name: 'tr',
            displayName: 'Turkish',
            numberFormat: {
                '.': ',',
                ',': '.',
                '-': '-',
                '+': '+',
                '%': '%',
                percent: { pattern: ['-%n', '%n'] },
                currency: { decimals: 2, symbol: '₺', pattern: ['-$n', '$n'] }
            },
            calendar: {
                '/': '.',
                ':': ':',
                firstDay: 1,
                days: ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'],
                daysAbbr: ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
                months: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'],
                monthsAbbr: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
                am: ['ÖÖ', 'Ö'],
                pm: ['ÖS', 'Ö'],
                eras: ['MS'],
                patterns: {
                    d: 'd.MM.yyyy', D: 'd MMMM yyyy dddd',
                    f: 'd MMMM yyyy dddd HH:mm', F: 'd MMMM yyyy dddd HH:mm:ss',
                    t: 'HH:mm', T: 'HH:mm:ss',
                    m: 'd MMMM', M: 'd MMMM',
                    y: 'MMMM yyyy', Y: 'MMMM yyyy',
                    g: 'd.MM.yyyy HH:mm', G: 'd.MM.yyyy HH:mm:ss',
                    s: 'yyyy"-"MM"-"dd"T"HH":"mm":"ss'
                },
            }
        },
        Licensing: {
            cls: 'KAPAT',
            ctc: 'Lütfen GrapeCity başvurun: <a href="mailto:us.sales@grapecity.com">us.sales@grapecity.com</a>.',
            dmn: 'Bu uygulamada Wijmo lisans geçerli etki alanı için geçerli değil. Lisans Alan\'ın <b> {licDomain}</b>; <b>{domain}</b>etki alanı için geçerli adıdır.',
            evl: 'Wijmo değer biçmek yorum ({version})',
            exp: 'Bu uygulamada Wijmo lisansının süresi doldu. <b>{expDate:d}</b>Lisans sona erme tarihidir.',
            hdr: 'Wijmo lisans',
            lic: 'Bu uygulamada Wijmo lisans geçersiz.',
            mss: 'Bu uygulamada Wijmo lisans ayarlanmamış.',
            prd: 'Bu uygulamada Wijmo lisans <b>{control}</b> denetimi için geçerli değil.',
            ver: 'Wijmo lisans bu uygulamada kullanılan sürümü için geçerli değildir. Lisans sürümüne <b>{licVer}</b>; <b>{version}</b>ürün sürümüdür.'
        },
        Calendar: {
            ariaLabels: {
                calendar: 'Takvim',
                monthView: 'Ay Görünümü',
                yearView: 'Yıl Görünümü',
                prvMo: 'Önceki Ay',
                today: 'Bugün',
                nxtMo: 'Gelecek Ay',
                prvYr: 'Önceki Yıl',
                currMo: 'Geçerli ay',
                nxtYr: 'Sonraki Yıl',
            }
        },
        DropDown: {
            ariaLabels: {
                tgl: 'Değiştir açılır'
            }
        },
        FlexGrid: {
            groupHeaderFormat: '{name}: <b>{value}</b> ({count:n0} öğe)',
            ariaLabels: {
                toggleDropDown: 'Değiştir açılır',
                toggleGroup: 'İki durumlu Grup'
            }
        },
        FlexGridDetailProvider: {
            ariaLabels: {
                toggleDetail: 'Geçiş satır ayrıntı'
            }
        },
        FlexGridFilter: {
            // aria labels
            ariaLabels: {
                edit: 'Sütun için Filtre Düzenle',
                dialog: 'Filtre Düzenleyicisi sütun için',
                asc: 'Artan düzende sıralama sütunu',
                dsc: 'Azalan düzende sıralama sütunu',
                search: 'Arama öğe listesi',
                op1: 'İlk koşul işleci',
                val1: 'İlk koşul değer',
                and: 'Her iki koşul gerektirir',
                or: 'Her iki koşul gerektirir',
                op2: 'İkinci koşul işleci',
                val2: 'İkinci koşul değer'
            },
            // filter
            ascending: '\u2191 Artan',
            descending: '\u2193 Azalan',
            apply: 'Uygula',
            cancel: 'İptal',
            clear: 'Temizle',
            conditions: 'Koşula Göre Filtrele',
            values: 'Değere Göre Filtrele',
            // value filter
            search: 'Ara',
            selectAll: 'Tümünü Seç',
            null: '(yok)',
            // condition filter
            header: 'Şu değere sahip öğeleri göster',
            and: 'Ve',
            or: 'Veya',
            stringOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Eşit değildir', op: 1 },
                { name: 'İle başlayan', op: 6 },
                { name: 'Son harfi', op: 7 },
                { name: 'İçerir', op: 8 },
                { name: 'İçermez', op: 9 }
            ],
            numberOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Eşit değildir', op: 1 },
                { name: 'Büyüktür', op: 2 },
                { name: 'Büyük veya eşittir', op: 3 },
                { name: 'Küçüktür', op: 4 },
                { name: 'Küçük veya eşittir', op: 5 }
            ],
            dateOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Öncesinde', op: 4 },
                { name: 'Sonrasında', op: 2 }
            ],
            booleanOperators: [
                { name: '(ayarlanmamış)', op: null },
                { name: 'Eşittir', op: 0 },
                { name: 'Eşit değildir', op: 1 }
            ]
        },
        InputDateTime: {
            ariaLabels: {
                tglDate: 'Geçiş takvimi',
                tglTime: 'Geçiş zamanı listesi'
            }
        },
        InputNumber: {
            ariaLabels: {
                incVal: 'Artış değeri',
                decVal: 'Değerini azaltın'
            }
        },
        MultiSelect: {
            itemsSelected: '{count:n0} ürün seçilen',
            selectAll: 'Tümünü Seç'
        },
        olap: {
            PivotFieldEditor: {
                dialogHeader: 'Alan ayarları:',
                header: 'Başlık:',
                summary: 'Özeti:',
                showAs: 'Gibi görüntüler:',
                weighBy: 'Tarafından tartmak:',
                sort: 'Sıralama:',
                filter: 'Filtre:',
                format: 'Biçim:',
                sample: 'Örnek:',
                edit: 'Düzenle…',
                clear: 'Temizle',
                ok: 'Tamam',
                cancel: 'İptal',
                none: '(yok)',
                sorts: {
                    asc: 'Artan',
                    desc: 'Azalan'
                },
                aggs: {
                    sum: 'Toplam',
                    cnt: 'Sayı',
                    avg: 'Ortalama',
                    max: 'En Büyük',
                    min: 'dak',
                    rng: 'Aralık',
                    std: 'StdSapma',
                    var: 'Varyans',
                    stdp: 'StdDevPop',
                    varp: 'VarPop',
                    first: 'İlk',
                    last: 'Son'
                },
                calcs: {
                    noCalc: 'Hesaplama Yok',
                    dRow: 'Önceki satırdan fark',
                    dRowPct: '% Fark önceki satırdan',
                    dCol: 'Önceki sütun arasındaki fark',
                    dColPct: '% Fark--dan önceki sütun',
                    dPctGrand: 'Genel toplam %',
                    dPctRow: 'satır toplam %',
                    dPctCol: 'sütunu toplamı %',
                    dRunTot: 'Toplam çalışan',
                    dRunTotPct: 'çalışan toplam %'
                },
                formats: {
                    n0: 'Tamsayı (n0)',
                    n2: 'Ondalık (n2)',
                    c: 'Para birimi (c)',
                    p0: 'Yüzde (p0)',
                    p2: 'Yüzde (p2)',
                    n2c: 'Binlerce (n2,)',
                    n2cc: 'Milyonlarca (n2,,)',
                    n2ccc: 'Milyarlarca (n2,,,)',
                    d: 'Tarih (d)',
                    MMMMddyyyy: 'Ay gün yıl (AAAA gg, yyyy)',
                    dMyy: 'Gün ay yıl (d/M/yıl)',
                    ddMyy: 'Gün ay yıl (gg/M/yy)',
                    dMyyyy: 'Gün ay yıl (gg/M/yyyy)',
                    MMMyyyy: 'Ay yıl (MMM yyyy)',
                    MMMMyyyy: 'Ay yıl (AAAA yyyy)',
                    yyyyQq: 'Yıl Mahallesi (yyyy "Q" q)',
                    FYEEEEQU: 'Mali yıl çeyrek ("My" EEEE "Q" U)'
                }
            },
            PivotEngine: {
                grandTotal: 'Genel Toplam',
                subTotal: 'Alt Toplam'
            },
            PivotPanel: {
                fields: 'Rapora eklenecek alanları seçin:',
                drag: 'Alanları aşağıdaki bölgeler arasında sürükleyin:',
                filters: 'Filtreler',
                cols: 'Sütunlar',
                rows: 'Satırlar',
                vals: 'Değerler',
                defer: 'Güncelleştirmeleri erteleme',
                update: 'Güncelleştir'
            },
            _ListContextMenu: {
                up: 'Yukarı Taşı',
                down: 'Aşağı Taşı',
                first: 'Başlangıca Taşı',
                last: 'Sona taşı',
                filter: 'Rapor Filtresine Taşı',
                rows: 'Satır Etiketlerine Taşı',
                cols: 'Sütun Etiketlerine Taşı',
                vals: 'Değerlere Taşı',
                remove: 'Alanı Kaldır',
                edit: 'Alan Ayarları…',
                detail: 'Ayrıntı göster…'
            },
            PivotChart: {
                by: 'ölçüt',
                and: 'ile'
            },
            DetailDialog: {
                header: 'Ayrıntı görünümü:',
                ok: 'Tamam',
                items: '{cnt:n0} bileşen',
                item: '{cnt} öğesi',
                row: 'Satır',
                col: 'Sütun'
            },
            Slicer: {
                multiSelect: 'Çoklu seçim',
                clearFilter: 'Filtreyi temizle'
            }
        },
        Viewer: {
            cancel: 'İptal',
            ok: 'Tamam',
            bottom: 'Alttan:',
            top: 'Üstten:',
            right: 'Sağ:',
            left: 'Sol:',
            margins: 'Kenar Boşlukları (inç)',
            orientation: 'Oryantasyon:',
            paperKind: 'Kağıt türü:',
            pageSetup: 'Sayfa Düzeni',
            landscape: 'Yatay',
            portrait: 'Dikey',
            pageNumber: 'Sayfa Numarası',
            zoomFactor: 'Yakınlaştırma faktörü',
            paginated: 'Yazdırma Düzeni',
            print: 'Yazdır',
            search: 'Ara',
            matchCase: 'Büyük-küçük harf eşleştir',
            wholeWord: 'Sadece tam sözcükleri eşleştir',
            searchResults: 'Arama sonuçları',
            previousPage: 'Önceki Sayfa',
            nextPage: 'Sonraki Sayfa',
            firstPage: 'İlk Sayfa',
            lastPage: 'Son Sayfa',
            backwardHistory: 'Geri',
            forwardHistory: 'İleri',
            pageCount: 'Sayfa Sayısı',
            selectTool: 'Aracını seçin',
            moveTool: 'Taşıma aracı',
            continuousMode: 'Sürekli sayfa görünümü',
            singleMode: 'Tek sayfa görünümü',
            wholePage: 'Tüm Sayfaya Sığdır',
            pageWidth: 'Sayfa genişliğine sığdırma',
            zoomOut: 'Küçült',
            zoomIn: 'Büyüt',
            rubberbandTool: 'Seçimle Yakınlaştır',
            magnifierTool: 'Büyüteç',
            rotatePage: 'Sayfayı Döndür',
            rotateDocument: 'Belgeyi Döndür',
            exports: 'Dışarı Aktar',
            fullScreen: 'Tam Ekran',
            exitFullScreen: 'Tam Ekrandan Çık',
            hamburgerMenu: 'Araçlar',
            showSearchBar: 'Arama Çubuğunu Göster',
            viewMenu: 'Düzen seçenekleri',
            searchOptions: 'Arama Seçenekleri',
            matchCaseMenuItem: 'Büyük Küçük Harf Eşleştir',
            wholeWordMenuItem: 'Tam sözcükleri eşleştir',
            thumbnails: 'Sayfa minik resimleri',
            outlines: 'Belge Bağlantıları',
            loading: 'Yükleniyor…',
            pdfExportName: 'Adobe PDF',
            docxExportName: 'Açık XML Word',
            xlsxExportName: 'Açık XML Excel',
            docExportName: 'Microsoft Word',
            xlsExportName: 'Microsoft Excel',
            mhtmlExportName: 'Web arşivi (MHTML)',
            htmlExportName: 'HTML belgesi',
            rtfExportName: 'RTF belgesi',
            metafileExportName: 'Sıkıştırılmış meta dosyaları',
            csvExportName: 'CSV',
            tiffExportName: 'TIFF görüntüleri',
            bmpExportName: 'BMP resimleri',
            emfExportName: 'Gelişmiş Meta dosyası',
            gifExportName: 'GIF resimleri',
            jpgExportName: 'JPEG görüntüleri',
            jpegExportName: 'JPEG görüntüleri',
            pngExportName: 'PNG resimleri',
            abstractMethodException: 'Bu soyut bir yöntemdir, lütfen uygulamak.',
            cannotRenderPageNoViewPage: 'Sayfa belge kaynak olmadan ve görünüm sayfası işleyemez.',
            cannotRenderPageNoDoc: 'Sayfa belge kaynak olmadan ve görünüm sayfası işleyemez.',
            exportFormat: 'Verme biçimi:',
            exportOptionTitle: 'Dışarı aktarma seçenekleri',
            documentRestrictionsGroup: 'Belge kısıtlamaları',
            passwordSecurityGroup: 'Parola güvenliği',
            outputRangeGroup: 'Çıkış aralığı',
            documentInfoGroup: 'Belge Bilgisi',
            generalGroup: 'Genel',
            docInfoTitle: 'Başlık',
            docInfoAuthor: 'Yazar',
            docInfoManager: 'Yönetici',
            docInfoOperator: 'İşleç',
            docInfoCompany: 'Şirket',
            docInfoSubject: 'Şahıs',
            docInfoComment: 'Yorum',
            docInfoCreator: 'Oluşturan',
            docInfoProducer: 'Yapımcı',
            docInfoCreationTime: 'Oluşturma zamanı',
            docInfoRevisionTime: 'Revizyon zaman',
            docInfoKeywords: 'Anahtar Sözcükler',
            embedFonts: 'TrueType yazı tiplerini katıştır',
            pdfACompatible: 'PDF/A uyumlu (seviye 2B)',
            useCompression: 'Kullanım sıkıştırma',
            useOutlines: 'Anahatlar Oluştur',
            allowCopyContent: 'İçerik kopyalama veya ayıklama izin',
            allowEditAnnotations: 'Ek açıklama düzenlemeye izin ver',
            allowEditContent: 'İçerik düzenlemeye izin ver',
            allowPrint: 'Baskı sağlar',
            ownerPassword: 'İzin (sahibi) parolası:',
            userPassword: 'Belge açık (kullanıcı) parola:',
            encryptionType: 'Şifreleme düzeyi:',
            paged: 'Disk Bellekli',
            showNavigator: 'Navigator göster',
            navigatorPosition: 'Seyirci Pozisyonu',
            singleFile: 'Tek dosya',
            tolerance: 'Metin sınırları (Puan) tespit zaman toleransı:',
            pictureLayer: 'Kullanım ayrı resim katmanı',
            metafileType: 'Meta dosyası türü:',
            monochrome: 'Tek renkli',
            resolution: 'Çözünürlük:',
            outputRange: 'Sayfa aralığı:',
            outputRangeInverted: 'Ters',
            showZoomBar: 'Yakınlaştırma çubuğu',
            searchPrev: 'Önceki arama',
            searchNext: 'Sonraki arama',
            checkMark: '\u2713',
            exportOk: 'Ver…',
            cannotSearch: 'Arama yapmak için bir belge kaynağı belirtilmelidir.',
            parameters: 'Parameters',
            requiringParameters: 'Lütfen giriş parametreleri.',
            nullParameterError: 'Değer null olamaz.',
            invalidParameterError: 'Geçersiz giriş.',
            parameterNoneItemsSelected: '(yok)',
            parameterAllItemsSelected: '(tümü)',
            parameterSelectAllItemText: '(Tümünü Seç)',
            selectParameterValue: '(değer seçin)',
            apply: 'Uygula',
            errorOccured: 'Hata oluştu.'
        },
        FlexSheet: {
            insertRow: 'Satır Ekle',
            deleteRow: 'Satır Sil',
            insertCol: 'Sütun ekle',
            deleteCol: 'Delete Column',
            convertTable: 'Tabloyu Dönüştür',
            copyCells: 'Hücreleri Kopyala',
            fillSeries: 'Serileri Doldur',
            fillFormat: 'Yalnızca Biçimlendirmeyi Doldur',
            fillWithoutFormat: 'Biçimlendirmeden Doldur'
        }
    };
    var updc = window['wijmo']._updateCulture;
    if (updc) {
        updc();
    }
})(wijmo || (wijmo = {}));
;

