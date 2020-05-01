//SHARED
import btn from './Shared/button.vue';
import bnr from './Shared/banner.vue';
import bnrNoItemsFound from './Shared/bannerNoItemsFound.vue';
import inPut from './Shared/input.vue';
import check from './Shared/check.vue';
import lbl from './Shared/lbl.vue';
import avatarInitials from './Shared/avatarInitials.vue';
import cardTitle from './Shared/qCard/cardTitle.vue';
import breadcrumb from './Shared/breadcrumbs.vue';
import dialog from './Shared/dialogCmp.vue';

//PAGE PARTNERS
import partnersList from 'pages/Partners/components/partnersList';
import partnersBanner from 'pages/Partners/components/partnersBanner';

//PAGE PARTNER
import partnerForm from 'pages/Partner/components/partnerForm';

//PAGE ORDERS
import ordersList from 'pages/Orders/components/ordersList.vue';

//PAGE ORDER
import orderTbl from 'pages/Order/components/orderTbl.vue';

const cmpMap = {
    //SHARED
    btn,
    bnr,
    bnrNoItemsFound,
    inPut,
    check,
    lbl,
    avatarInitials,
    cardTitle,
    breadcrumb,
    dialog,

    //PAGE PARTNERS
    partnersList,
    partnersBanner,

    //PAGE PARTNER
    partnerForm,

    //PAGE ORDERS
    ordersList,

    //PAGE ORDER
    orderTbl,
};

export function getComponent(cmp){
    return cmpMap[cmp];
}