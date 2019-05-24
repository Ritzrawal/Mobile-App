import i18n from 'i18next';
import {reactI18nextModule} from 'react-i18next';

import {AsyncStorage} from 'react-native';

const savedDataJSON = AsyncStorage.getItem('language');

const STORAGE_KEY = 'language';
AsyncStorage.getItem(STORAGE_KEY, (err, key) => {
  if (key != null) {
    i18n.changeLanguage(key);
  }
}).done();
i18n
    .use(reactI18nextModule)
    .init({
        fallbackLng: 'en',

        resources: {
            en: {
                sidebar: {
                    home: 'Home',
                    construction_library: 'Construction Library',
                    documents: 'Documents',
                    site_safety: 'Site Safety',
                    news: 'News',
                    How_to_strengthen_my_house:'How to strengthen my house?',
                    Material_Quality:'Material Quality & Storage',
                    How_safe_is_my_house:'How safe is my house?',
                    in_risk: 'In Risk',
                    statistics: 'Statistics',
                    faq: 'Faq',
                    columbia_form: 'Home Survey Form',
                    help: 'Help',

                    log_in:'Log In',

                },
                home: {
                    title: 'Home',
                    construction_library: 'Construction Library',
                    documents: 'Documents',
                    site_safety: 'Site Safety',
                    news: 'News',
                    How_safe_is_my_House:'How safe is my house?',
                    How_to_strengthen_my_house:'How to strengthen my house?',
                    in_risk: 'In Risk',
                    Materials_Quality:'Material Quality & Storage',
                    statistics: 'Statistics',
                    faq: 'Faq',
                    columbia_form: 'Columbia Form',
                    help: 'Help',


                    list:'List',
                    grid:'Grid',


                    total_statistics:'Total Statistics',


                    total_request:'Total Request',
                    total_design:'Total Design',
                    sucess_stories:'Sucess Stories',
                    app_download:'App Downloads'
                },
                construction_library:{
                    title: 'Construction Library',
                    technology:'Technology',
                    technology_select:'Please Select Technology',
                    confined_masonry:'Confined Masonry',
                    timber:'Timber',
                    no_of_floor:'Number of Floor',
                    floor_select:'Please Select Floor',
                    one_floor:'1 Floor',
                    two_floor:'2 Floor',
                    type_of_house:'Type of House',
                    house_select:'Please Select House',
                    type_36:'Type 36',
                    type_45:'Type 45',
                    type_54:'Type 54',
                    type_of_bedroom:'Type of Bedroom',
                    bedroom_select:'Please select Bedroom',
                    one_bedroom:'1 bedroom',
                    two_bedroom:'2 bedroom',
                    three_bedroom:'3 bedroom',
                    four_bedroom:'4 bedroom',
                    toilet_access:'Toilet Access',
                    inside:'Inside',
                    outside:'Outside',
                    terrace_location:'Terrace Location',
                    front_terrace:'Front Terrace',
                    back_terrace:'Back Terrace',
                    side_terrace:'Side Terrace',
                lot_size:'Lot Size',
                lot_size_select:'Please Select LotSize',
                    latitude:'Latitude',
                    longitude:'Longitude',
                    submit:'Submit',
                },
                faq: {
                    title: 'Faq',
                    back:'BACK',
                    buttonname:'For Futher Question Contact Us',
                    homebutton:"Back to HOME"
                },

                documents: {
                    back:'Back',
                    title: 'Documents',
                    download:'Download',
                    reference:'Reference',
                },
                strengthfirst:{
                back:'Back',
                title:'Start Strengthening!',
                stabuttontitlert:'Start Strengthening!'
                },
                parts_of_house:{
                    title:'Parts Of House',
                    back:'BACK',
                    startstrength:'Start Strengthening!',
                    strengthing:'Back to House Strengthening',
                    headersim:'I want to strengthen my:',
                },
                my_house_is:{
                    title:'MY HOUSE IS..',
                    back:'BACK',
                },
                display_photo:{
                    good:"Good Photos",
                    bad:'Bad Photos',
                    back:'BACK',
                },
                swiping_last_slide:{
                    outof:'Out Of',
                    correct:'Correct',
                    buttonyes:'Yes',
                    buttonno:'No',
                    back:'BACK',
                    button:"View All",
                    gotostrngth:'Go to Strengthening Techniques',
                    swipingtext:'Swipe for the next slide',
                },
                material_quality:{
                    back:'BACK',
                },
                material_Photo:{
                    back:'BACK',
                    nomorecard:'No More Slides!',
                    backtopart:'Back to parts of house',
                    homback:'Back to Home',
                    good:'Good photos',
                    bad:'Bad photos',
                    quality:'Back to material quality & Storage'
                },
                viewall:{
                    title:'BACK',
                  },
                news:{
                    title: 'News',
                },
                site_safety: {
                    title: 'Site Safety',
                },
                in_risk: {
                    title: 'In Risk',
                },
                statistics:{
                    title: 'Statistics',
                },
                columbia_form:{
                    title: 'Colombia Form',

                    full_name:'Full Name',
                    address:'Address',
                    lot_number:'Lot Number',
                    chip_code:'Chip Code',
                    contact_number:'Contact Number',
                    latitude:'Latitude',
                    longitude:'Longitude',
                    submit:'Submit',

                    picker_placeholder:'Please Select Option',
                    error_msg:'Sorry Your House Cannot be Retrofitted',
                    homeowner_id:'HomeOwner Id',
                    chip_code:'Chip Code',
                    map_hazard:'Map Hazard',
                    map_Hazard_o_1:'yes',
                    map_Hazard_o_2:'no',
                    retaining_wall:'Are there site retaining walls',
                    retaining_wall_o_1:'yes',
                    retaining_wall_o_2:'no',
                    side_retaing_wall_height:'Side Retaining Wall Height',
                    srw_distance:'Distance From House ( Side Retaing Wall)',
                    frw:'Are there Found Retaining Walls?',
                    frw_option_1:'yes',
                    frw_option_2:'no',
                    frw_distance:'Distance From House ( Found Retaing Wall)',
                    storeys:'Storeys',
                    storeys_o_1:'One',
                    storeys_o_2:'Two',
                    storeys_o_3:'More than two',
                    principle_masonry:'Is Principle Masonry',
                    principle_masonry_o_1:'yes',
                    principle_masonry_o_2:'no',
                    frw_height:'Found Retaining Wall Height',
                    construction_detail:'Construction Detail',
                    residential:'Is the type of residential?',
                    residential_o_1:'yes',
                    residential_o_2:'no',
                    evidence:'Evidence of Damage',
                    evidence_o_1:'yes',
                    evidence_o_2:'no',
                    roof_type:'Roof Type',
                    roof_type_o_1:'Heavy',
                    roof_type_o_2:'Light',
                    roof_slab_type:'Roof Slab Type',
                    roof_slab_type_o_1:'Type 1',
                    roof_slab_type_o_2:'Type 2',
                    roof_slab_type_o_3:'Type 3',
                    roof_slab_type_o_4:'Others',
                    cantiliver:'Is there Cantilever',
                    cantiliver_o_1:'yes',
                    cantiliver_o_2:'no',
                    building_shape:'Building Shape',
                    buildingShape_o_1:'Simple',
                    buildingShape_o_2:'Complex',
                    building_shape_select:'Please select Options',
                    magic_plan:'Proceed to Magic Plan App'
                },
                login_form:
                {
                  username: 'Username',
                  password: 'Password',
                  username_error:'Enter correct username between 5 to 50 characters',
                  password_error:'Enter correct password between 4 to 20 characters',
                  login:'Login',
                },
                setting:{
                  title:'Setting',
                  about_us:'About Us',
                  contact_us:'Contact Us',
                  privacy_terms:'Privacy and Terms'
                
                },
                about_us:{
                title:'About Us',
                  about_text:'BuildChange.org built the Construction app as a Free app.This SERVICE is provided by BuildChange.org at no cost and is intened for use as is',
                  call_us:'Call Us',
                  mail_us:'Mail Us',
                },
                contact_us:{
                    title:'Contact Us',
                  help_text1:'How we can help you?',
                  help_text2:'Have a question,comment,suggestion, or just want to get in touch? We would love to hear from you.Fill out the form below and someone will get back to you as soon as possible',
                  full_name:'Full Name',
                  email_address:'Email Address',
                  phone:'Mobile Number',
                  write_message:'Write Message',
                  send:'Send',
                },
                common: {
                    details: 'Details',
                    loading: 'Loading...',
                    error: 'An error occurred, please try again later',
                    save: 'Save',
                    validation: 'Please check your parameters...',
                },
            },
            fil: {
                sidebar: {
                    home: 'Bahay',
                    construction_library: 'Library ng Konstruksyon',
                    documents: 'Mga Dokumento',
                    site_safety: 'Kaligtasan sa Site',
                    How_to_strengthen_my_house:'Paano patibayin ang aking bahay?',
                    Material_Quality:'Kalidad ng materyales at imbakan',
                    How_safe_is_my_house:'Gaano kaligtas ang aking bahay?',
                    Refrences: 'Sanggunian',
                    in_risk: 'sa panganib',
                    news: 'Balita',
                    statistics: 'istatistika',
                    faq: 'Mga madalas itanong',
                    columbia_form: 'Columbia Form',
                    help: 'Tulong',

                    log_in:'Mag log in',

                },
                home: {
                    title: 'Bahay',
                    References: 'Sanggunian',
                    documents: 'Mga Dokumento',
                    site_safety: 'Kaligtasan sa Site',
                    How_safe_is_my_House: 'Gaano kaligtas ang aking bahay?',
                    news: 'Balita',
                    How_to_strengthen_my_house :'Paano patibayin ang aking bahay?',
                    Materials_Quality:'Kalidad ng materyales at imbakan',
                    statistics: 'istatistika',
                    Faq: 'Mga madalas itanong',
                    columbia_form: 'Columbia Form',

                    list:'Listahan',
                    grid:'Grid',


                    total_statistics:'Kabuuang Istatistika',

                    total_request:'Kabuuang Kahilingan',
                    total_design:'Kabuuang Disenyo',
                    sucess_stories:'Mga Kuwento ng Tagumpay',
                    app_download:'Mga Pag-download ng App'
                },
                construction_library:{
                    title: 'Library ng Konstruksyon',
                    technology:'Teknolohiya',
                    technology_select:'Mangyaring Piliin Teknolohiya',
                    confined_masonry:'Nakakulong Pagmamason',
                    timber:'Timber',
                    no_of_floor:'Bilang ng Floor',
                    floor_select:'Mangyaring Piliin ang Floor',
                    one_floor:'1 Palapag',
                    two_floor:'2 Palapag',
                    type_of_house:'Uri ng Bahay',
                    house_select:'Mangyaring Piliin ang Bahay',
                    type_36:'Uri 36',
                    type_45:'Uri 45',
                    type_54:'Uri 54',
                    type_of_bedroom:'Uri ng Bedroom',
                    bedroom_select:'Mangyaring pumili ng Bedroom',
                    one_bedroom:'1 silid-tulugan',
                    two_bedroom:'2 silid-tulugan',
                    three_bedroom:'3 silid-tulugan',
                    four_bedroom:'4 silid-tulugan',
                    toilet_access:'Access sa Toilet',
                    inside:'Sa loob',
                    outside:'Sa labas',
                    terrace_location:'Terrace Lokasyon',
                    front_terrace:'Front Terrace',
                    back_terrace:'Bumalik Terrace',
                    side_terrace:'Side Terrace',
                    lot_size:'Laki ng Lote',
                    lot_size_select:'Mangyaring Piliin ang Laki ng Lote',
                    latitude:'Latitude',
                    longitude:'Longitude',
                    submit:'Ipasa'
                },
                faq: {
                    title: 'madalas na tanungin tanonga',
                    back:'Bumalik',
                    homebutton:"Bumalik sa Tahanan",
                    buttonname:'Para sa Futher Question Makipag-ugnay sa Amin',
                },
                viewall:{
                  title:'Bumalik',
                },
                documents: {
                    title: 'Mga Dokumento',
                    back:'Bumalik',
                    download:'I-download',
                    reference:'sanggunian',
                },
                                news: {
                    title: 'Balita',
                },
                site_safety: {
                    title: 'kaligtasan ng site',
                },
                parts_of_house:{
                    title:'mga bahagi ng bahay',
                    back:'Bumalik',
                    startstrength:'Simulan ang Pagpapalakas',
                    headersim:'Gusto kong pagtibayin ang aking:',
                },
                my_house_is:{
                   title: 'Ang aking bahay ay',
                   back:'Bumalik',
                },
                display_photo:{
                    good:"magandang larawan",
                    bad:'masamang mga larawan',
                    back:'Bumalik',
                },
                swiping_last_slide:{
                    outof:' mula sa',
                    gotostrngth:'Pumunta sa Strengthening Technique',
                    correct:'Tama',
                    buttonyes:'Oo',
                    buttonno:'Hindi',
                    back:'Bumalik',
                    button:"Tingnan lahat",
                    swipingtext:'Mag-swipe para sa susunod na slide',
                },
                material_quality:{
                    back:'Bumalik',
                },
                strengthfirst:{
                    back:'Bumalik',
                    title:'Simulan ang Strengthening!',
                    stabuttontitlert:'Start Strengthening!'
                    },
                material_Photo:{
                    back:'Bumalik',
                    nomorecard:'wala nang mga card',
                    backtopart:'Bumalik sa mga bahagi ng bahay',
                    homback:'Bumalik sa Tahanan',
                    good:'Magandang larawan',
                    bad:'Masamang mga larawan',
                    quality:'Bumalik sa kalidad ng materyal at Imbakan'
                },
                in_risk: {
                    title: 'sa panganib',
                },
                statistics:{
                    title: 'istatistika',
                },
                columbia_form:{
                    title: 'Tinjauan pemilik rumah',
                    full_name:'Buong pangalan',
                    address:'Address',
                    lot_number:'Numero ng Lot',
                    chip_code:'Code ng Chip',
                    contact_number:'Numero ng Contact',
                    latitude:'Latitude',
                    longitude:'Longitude',
                    submit:'Ipasa',

                    picker_placeholder:'Mangyaring Piliin ang Pagpipilian',
                    error_msg:'Paumanhin Ang Iyong Bahay ay hindi maaaring ma-retrofitted',
                    homeowner_id:'HomeOwner Id',
                    chip_code:'Code ng Chip',
                    map_hazard:'Mapanganib na Mapa',
                    map_Hazard_o_1:'oo',
                    map_Hazard_o_2:'hindi',
                    retaining_wall:'Mayroon bang mga site retaining wall',
                    retaining_wall_o_1:'oo',
                    retaining_wall_o_2:'hindi',
                    side_retaing_wall_height:'Side Retaining Wall Height',
                    srw_distance:'Distance From House (Side Retaing Wall)',
                    frw:'May Natagpuang mga Retaining Wall',
                    frw_option_1:'oo',
                    frw_option_2:'hindi',
                    frw_distance:'Distance From House (Found Retaing Wall)',
                    storeys:'Mga Tindahan',
                    storeys_o_1:'Isa',
                    storeys_o_2:'Dalawa',
                    storeys_o_3:'Higit sa dalawa',
                    principle_masonry:'Ang Prinsipyo Pagmamason',
                    principle_masonry_o_1:'oo',
                    principle_masonry_o_2:'hindi',
                    frw_height:'Natagpuan Retaining Wall Taas',
                    construction_detail:'Detalye ng Konstruksyon',
                    residential:'Ang uri ba ng tirahan',
                    residential_o_1:'oo',
                    residential_o_2:'hindi',
                    evidence:'Katibayan ng Pinsala',
                    evidence_o_1:'oo',
                    evidence_o_2:'hindi',
                    roof_type:'Uri ng Bubong',

                    roof_type_o_1:'Malakas',
                    roof_type_o_2:'Banayad',
                    

                    roof_slab_type:'Uri ng Bubong na Slab',
                    roof_slab_type_o_1:'Uri ng 1',
                    roof_slab_type_o_2:'I-type ang 2',
                    roof_slab_type_o_3:'Uri ng 3',
                    roof_slab_type_o_4:'Iba pa',
                    cantiliver:'Mayroon bang cantilever',
                    cantiliver_o_1:'oo',
                    cantiliver_o_2:'hindi',
                    building_shape:'Building Shape',
                    buildingShape_o_1:'Simple',
                    buildingShape_o_2:'Complex',
                    building_shape_select:'Pakipili ang Opsyon',
                    magic_plan:'Magpatuloy sa Magic Plan App'
                },
                login_form:
                {
                username: 'Username',
                password: 'Password',
                username_error:'Ipasok ang tamang username sa pagitan ng 5 hanggang 50 character',
                password_error:'Ipasok ang tamang password sa pagitan ng 4 hanggang 20 na mga character',
                login:'Mag log in',
                },
                setting:{
                title:'Pagtatakda',
                about_us:'Tungkol sa atin',
                contact_us:'Makipag-ugnayan sa amin',
                privacy_terms:'Privacy at Mga Tuntunin'

                },
                about_us:{
                    title:'Tungkol sa atin',
                about_text:'Ang BuildChange.org ay nagtayo ng Construction app bilang isang libreng app. Ang SERBISYO na ito ay ibinibigay ng BuildChange.org nang walang bayad at ito ay binigyang-diin para sa paggamit bilang ay',
                call_us:'Tumawag sa Amin',
                mail_us:'Mail sa Amin',
                },
                contact_us:{
                    title:'Makipag-ugnayan sa amin',
                help_text1:'Paano namin matutulungan ka?',
                help_text2:'Magkaroon ng isang katanungan, puna, mungkahi, o gusto lang makipag-ugnay? Gustung-gusto naming magsaya mula sa iyo. Punan ang form sa ibaba at ang isang tao ay babalik sa iyo sa lalong madaling panahon',
                full_name:'Buong pangalan',
                email_address:'Email Address',
                phone:'  Numero ng Mobile',
                write_message:'Magsulat ng mensahe',
                send:'Ipadala',
                },
                common: {
                    details: 'Détails',
                    loading: 'Chargement...',
                    error: 'Une erreur est survenue, veuillez réessayer plus tard',
                    save: 'Sauvegarder',
                    validation: 'Merci de vérifier vos paramètres...',
                },
            }
        },

        // have a common namespace used around the full app
        ns: ['common'],
        defaultNS: 'common',

        debug: false,

        cache: {
            enabled: true
        },

        interpolation: {
            escapeValue: false, // not needed for react as it does escape per default to prevent xss!
        }
    });


export default i18n;