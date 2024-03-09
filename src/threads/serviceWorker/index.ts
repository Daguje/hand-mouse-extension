// import { browser } from 'webextension-polyfill-ts';
// import {
//   getStorageItem,
//   initializeStorageWithDefaults,
// } from '../../utils/storage';

import { initializeStorageWithDefaults } from '@utils/storage';
import { browser } from 'webextension-polyfill-ts';

const handMouseModel = `
svm_type epsilon_svr
kernel_type polynomial
degree 2
gamma 1
coef0 0
nr_class 2
total_sv 53
rho -2.55691
SV
-5.267842241348562 1:0.18085758 2:0.82821126 3:0.23135094 4:0.80884699 5:0.27272945 6:0.76764433 7:0.29998153 8:0.73894774 9:0.30283561 10:0.71285892 11:0.2293921 12:0.64562578 13:0.27417249 14:0.62590803 15:0.29964366 16:0.67358686 17:0.31005238 18:0.72468881 19:0.2043549 20:0.62686468 21:0.21944647 22:0.53912072 23:0.23707091 24:0.47657407 25:0.24744894 26:0.42473645 27:0.17437677 28:0.63658373 29:0.16741653 30:0.54323093 31:0.17388367 32:0.47952904 33:0.17957245 34:0.42540927 35:0.14163176 36:0.66688604 37:0.10622497 38:0.59731755 39:0.091158773 40:0.54725431 41:0.083059548 42:0.50441168 
-6 1:0.19787028 2:0.53623663 3:0.25223548 4:0.53905134 5:0.30038915 6:0.50629477 7:0.32807038 8:0.47710192 9:0.32079411 10:0.45063737 11:0.25364794 12:0.36556687 13:0.29572371 14:0.34373468 15:0.31920647 16:0.37834894 17:0.32664306 18:0.41868757 19:0.22800463 20:0.33570402 21:0.24926565 22:0.2541929 23:0.27336334 24:0.19133355 25:0.29126339 26:0.13854679 27:0.19701732 28:0.33441976 29:0.18868829 30:0.2416775 31:0.19369356 32:0.17550738 33:0.20213377 34:0.12055011 35:0.16652925 36:0.35723129 37:0.13925558 38:0.28212812 39:0.12719737 40:0.23145032 41:0.12236788 42:0.19107886 
-6 1:0.79309608 2:0.8062293 3:0.78544402 4:0.76890399 5:0.79797389 6:0.71569794 7:0.81412466 8:0.68093102 9:0.82860099 10:0.66082839 11:0.79305852 12:0.66805433 13:0.82577258 14:0.60703086 15:0.85001997 16:0.56658553 17:0.86949533 18:0.53941776 19:0.80909898 20:0.66354153 21:0.84338215 22:0.59128346 23:0.86803202 24:0.54209974 25:0.88970575 26:0.50633875 27:0.83252772 28:0.6704328 29:0.86180278 30:0.59771812 31:0.88422075 32:0.54703929 33:0.90255608 34:0.50886234 35:0.86274076 36:0.68746445 37:0.89407349 38:0.63550025 39:0.91247391 40:0.59898134 41:0.92695644 42:0.56893067 
-2.902480943890633 1:0.82554618 2:0.56309898 3:0.8900252 4:0.56188829 5:0.93033415 6:0.53595045 7:0.96154362 8:0.52478493 9:0.97648212 10:0.50187063 11:0.88491887 12:0.4246259 13:0.921593 14:0.40849256 15:0.95179131 16:0.42675305 17:0.96945512 18:0.45269596 19:0.87941309 20:0.4053495 21:0.91933129 22:0.37289332 23:0.95271163 24:0.37796496 25:0.97263368 26:0.39310609 27:0.86868749 28:0.38907503 29:0.89611022 30:0.33158623 31:0.92829827 32:0.30601873 33:0.94730729 34:0.29717172 35:0.85851046 36:0.3807893 37:0.86042763 38:0.30954021 39:0.8719523 40:0.26819605 41:0.87866222 42:0.24223611 
6 1:0.28491941 2:0.85072729 3:0.34581627 4:0.8409051 5:0.3957033 6:0.80982307 7:0.43888139 8:0.79229683 9:0.45433523 10:0.77172781 11:0.34605215 12:0.65243946 13:0.39895195 14:0.62650379 15:0.42956324 16:0.67299692 17:0.44270825 18:0.72513333 19:0.32937875 20:0.62977567 21:0.35534122 22:0.53490093 23:0.38491696 24:0.4671429 25:0.4055044 26:0.41364051 27:0.30592203 28:0.63525799 29:0.30489973 30:0.53018105 31:0.32312031 32:0.4553386 33:0.34124012 34:0.39528514 35:0.28243239 36:0.6592886 37:0.2588733 38:0.57234494 39:0.25295302 40:0.50957321 41:0.25458759 42:0.45820436 
-6 1:0.84518349 2:0.88576886 3:0.82170039 4:0.87079633 5:0.81067502 6:0.82699794 7:0.80304907 8:0.79693945 9:0.79693737 10:0.76745426 11:0.83762661 12:0.7378881 13:0.8368852 14:0.66700103 15:0.83322641 16:0.63340904 17:0.83162686 18:0.60914108 19:0.8407197 20:0.73683304 21:0.82074017 22:0.65010144 23:0.80403491 24:0.59705559 25:0.79245201 26:0.55650025 27:0.84399344 28:0.75587454 29:0.82974192 30:0.70039043 31:0.81420746 32:0.69912572 33:0.80527305 34:0.70431432 35:0.84914653 36:0.78557733 37:0.87512802 38:0.75800755 39:0.8969676 40:0.74425038 41:0.91356295 42:0.73280379 
4.315178656806927 1:0.86307957 2:0.58678212 3:0.80731006 4:0.57197628 5:0.76074342 6:0.525456 7:0.74165875 8:0.48994059 9:0.75997338 10:0.46315561 11:0.80285956 12:0.38107949 13:0.76284214 14:0.33283208 15:0.75797292 16:0.37787744 17:0.75905482 18:0.42471332 19:0.83754167 20:0.35932281 21:0.80779924 22:0.26089185 23:0.78515872 24:0.19949899 25:0.76292228 26:0.14263458 27:0.87511764 28:0.36442742 29:0.86786335 30:0.25667923 31:0.86189628 32:0.18694621 33:0.85729869 34:0.12737559 35:0.9159616 36:0.38383876 37:0.93164103 38:0.2965482 39:0.94184626 40:0.23540542 41:0.94881064 42:0.1770029 
-6 1:0.25045768 2:0.49762046 3:0.20329735 4:0.49134473 5:0.16433886 6:0.45540326 7:0.13628579 8:0.42776247 9:0.12931133 10:0.39818671 11:0.22338994 12:0.34461715 13:0.18296162 14:0.28638828 15:0.15724589 16:0.3019142 17:0.147871 18:0.32834026 19:0.2400515 20:0.33254895 21:0.22457172 22:0.24506605 23:0.20058205 24:0.19399533 25:0.18608542 26:0.15491559 27:0.24919813 28:0.33977552 29:0.24633499 30:0.25074642 31:0.2368622 32:0.18929144 33:0.23425719 34:0.14262041 35:0.25312597 36:0.35265595 37:0.2599669 38:0.28168318 39:0.26804023 40:0.23106107 41:0.27687625 42:0.18928542 
-2.468010008766822 1:0.22639525 2:0.80124748 3:0.17637529 4:0.79669119 5:0.12844864 6:0.77298643 7:0.094395528 8:0.75586167 9:0.096626333 10:0.73324629 11:0.16225638 12:0.6316895 13:0.11634644 14:0.59677146 15:0.10063195 16:0.63257913 17:0.09792618 18:0.67487421 19:0.18081005 20:0.60986585 21:0.14945731 22:0.52021786 23:0.10980771 24:0.47041779 25:0.075278964 26:0.42876219 27:0.20172198 28:0.61146797 29:0.18360338 30:0.51501604 31:0.1567488 32:0.4540609 33:0.13568039 34:0.40608415 35:0.22241357 36:0.62566117 37:0.23001985 38:0.54340743 39:0.2346881 40:0.48571078 41:0.23803192 42:0.43734952 
-6 1:0.55112179 2:0.72299067 3:0.4900471 4:0.70442327 5:0.45342357 6:0.64222215 7:0.43916505 8:0.58524808 9:0.43839905 10:0.54033965 11:0.50077237 12:0.52511519 13:0.48201473 14:0.43378811 15:0.45538103 16:0.37578299 17:0.4350324 18:0.3281336 19:0.5173849 20:0.5133686 21:0.49749342 22:0.41384232 23:0.46661892 24:0.34844227 25:0.44151584 26:0.29244091 27:0.53539323 28:0.51484376 29:0.51452778 30:0.41586225 31:0.48455561 32:0.3461152 33:0.46183002 34:0.29053962 35:0.55626939 36:0.52665099 37:0.54792038 38:0.43982591 39:0.54158248 40:0.38344507 41:0.53865103 42:0.34151097 
4.934047302991408 1:0.16023937 2:0.89077758 3:0.19724579 4:0.8842678 5:0.22990741 6:0.85039499 7:0.2404508 8:0.81263719 9:0.23840095 10:0.77961574 11:0.21822102 12:0.80557298 13:0.22846719 14:0.77469455 15:0.23492948 16:0.75551671 17:0.23774672 18:0.7420264 19:0.19321756 20:0.79638536 21:0.19974193 22:0.76228993 23:0.2021972 24:0.74628841 25:0.20400846 26:0.7292853 27:0.16741802 28:0.79417864 29:0.16874396 30:0.75997772 31:0.17067528 32:0.74426944 33:0.17167581 34:0.72858861 35:0.13863744 36:0.797905 37:0.13730316 38:0.76840182 39:0.13541731 40:0.75492878 41:0.1329822 42:0.74228916 
0.4561308003191925 1:0.18879621 2:0.4143361 3:0.24287449 4:0.40492137 5:0.28119136 6:0.34268952 7:0.28484499 8:0.27638666 9:0.27574932 10:0.22899793 11:0.28053227 12:0.28481578 13:0.28698804 14:0.24476274 15:0.27877888 16:0.2869959 17:0.26988456 18:0.31186569 19:0.24966389 20:0.27448477 21:0.25484493 22:0.23645641 23:0.24346346 24:0.29484915 25:0.23949261 26:0.31180542 27:0.21765016 28:0.2673652 29:0.22164945 30:0.23207283 31:0.21564535 32:0.28822729 33:0.21155975 34:0.30860297 35:0.18147548 36:0.26249277 37:0.1894557 38:0.22851871 39:0.18874284 40:0.26823074 41:0.18585275 42:0.28822123 
-2.592064442506595 1:0.80149316 2:0.39283754 3:0.86143773 4:0.3604202 5:0.90634836 6:0.29849317 7:0.91994982 8:0.23602428 9:0.90304095 10:0.18136862 11:0.86460074 12:0.21633932 13:0.89415289 14:0.18331287 15:0.90026388 16:0.23674688 17:0.88111074 18:0.27036123 19:0.8386705 20:0.21197969 21:0.88034577 22:0.18176209 23:0.87960141 24:0.24877213 25:0.85652046 26:0.27311373 27:0.81027475 28:0.20991839 29:0.85728643 30:0.18918052 31:0.85693785 32:0.25250784 33:0.83186379 34:0.27292333 35:0.77426729 36:0.2109945 37:0.82726778 38:0.19137151 39:0.83183081 40:0.23842594 41:0.81053323 42:0.26224969 
6 1:0.77975695 2:0.76148073 3:0.83837064 4:0.74845294 5:0.88846412 6:0.69795553 7:0.90509356 8:0.65067463 9:0.88829906 10:0.61619077 11:0.82272742 12:0.59044401 13:0.86729923 14:0.5794934 15:0.86878487 16:0.62339633 17:0.84943814 18:0.6501874 19:0.7978682 20:0.58968923 21:0.85358249 22:0.58498022 23:0.85563758 24:0.63089394 25:0.8349181 26:0.65554929 27:0.77679306 28:0.601348 29:0.83871383 30:0.60160772 31:0.8412964 32:0.64933196 33:0.82126312 34:0.67389005 35:0.75828488 36:0.62290417 37:0.81662169 38:0.62163612 39:0.82490665 40:0.65701196 41:0.80956765 42:0.67942464 
3.625459114135254 1:0.89746083 2:0.82989374 3:0.85610083 4:0.8141741 5:0.82466684 6:0.77057657 7:0.82556958 8:0.72451831 9:0.84503648 10:0.69140685 11:0.82678008 12:0.69828539 13:0.84024774 14:0.67224673 15:0.85077022 16:0.71406622 17:0.85157379 18:0.73982971 19:0.86172017 20:0.69244712 21:0.87281453 22:0.67139973 23:0.88013284 24:0.72705197 25:0.8776706 26:0.74894489 27:0.894158 28:0.69384473 29:0.90591265 30:0.67545047 31:0.90484967 32:0.72602056 33:0.89732784 34:0.74935268 35:0.92569652 36:0.70100662 37:0.93063945 38:0.68055865 39:0.92529851 40:0.71722019 41:0.91708494 42:0.74070893 
4.441415068301869 1:0.91391975 2:0.4443718 3:0.86814691 4:0.43673027 5:0.82960039 6:0.37869946 7:0.8308579 8:0.31676196 9:0.85131262 10:0.27817491 11:0.83669661 12:0.31850666 13:0.8396205 14:0.28226596 15:0.84906117 16:0.32913986 17:0.85290314 18:0.35170446 19:0.87200619 20:0.31148932 21:0.87177753 22:0.27853273 23:0.87923351 24:0.34208396 25:0.88073278 26:0.35387773 27:0.90352544 28:0.30887673 29:0.90658434 30:0.27646825 31:0.90633084 32:0.3347427 33:0.90680689 34:0.35479291 35:0.93756611 36:0.30823913 37:0.93645477 38:0.27499976 39:0.93278145 40:0.3077429 41:0.93171392 42:0.32285172 
6 1:0.23538627 2:0.34791371 3:0.18144603 4:0.32560014 5:0.13575508 6:0.27165584 7:0.12225525 8:0.21608546 9:0.14241455 10:0.17539064 11:0.17211007 12:0.20311261 13:0.15475403 14:0.16614509 15:0.15075786 16:0.2129493 17:0.16151731 18:0.24928182 19:0.202775 20:0.1941552 21:0.17713522 22:0.15914189 23:0.17891447 24:0.22407031 25:0.19357262 26:0.25432814 27:0.23717255 28:0.18783416 29:0.20775181 30:0.14977621 31:0.20672304 32:0.21227208 33:0.22218946 34:0.24859448 35:0.27889064 36:0.18485006 37:0.24692741 38:0.13991994 39:0.23803244 40:0.17962439 41:0.24595411 42:0.213249 
6 1:0.23957629 2:0.75025988 3:0.18856117 4:0.7345853 5:0.13760931 6:0.68822688 7:0.11405946 8:0.64470539 9:0.13351432 10:0.61228871 11:0.18902417 12:0.55239249 13:0.13873482 14:0.57455061 15:0.15213855 16:0.6291426 17:0.17728207 18:0.65697963 19:0.21898408 20:0.54559024 21:0.1605745 22:0.58038824 23:0.17146631 24:0.63884508 25:0.19424505 26:0.66129078 27:0.24890853 28:0.55577802 29:0.19193626 30:0.58825057 31:0.19883077 32:0.64559118 33:0.21691305 34:0.66774981 35:0.27989514 36:0.57813709 37:0.22796836 38:0.59413563 39:0.22532025 40:0.63850159 41:0.23716087 42:0.66023949 
4.303256457545134 1:0.49740976 2:0.6407639 3:0.43188604 4:0.59779241 5:0.37732161 6:0.53034433 7:0.35937859 8:0.46745054 9:0.39184533 10:0.42309441 11:0.42910272 12:0.41467645 13:0.39825138 14:0.3912022 15:0.39731255 16:0.45379499 17:0.4130082 18:0.49857337 19:0.46375465 20:0.41086167 21:0.43287001 22:0.39226326 23:0.42850804 24:0.46685366 25:0.44119121 26:0.51058334 27:0.5006054 28:0.41813732 29:0.46940571 30:0.39926415 31:0.46223803 32:0.47033458 33:0.47508549 34:0.51504855 35:0.54271603 36:0.43566795 37:0.50897387 38:0.40501654 39:0.49541768 40:0.45539593 41:0.50000774 42:0.49623235 
-6 1:0.86317837 2:0.9088504 3:0.84886714 4:0.90739615 5:0.84340442 6:0.86987173 7:0.8555044 8:0.82879067 9:0.86659049 10:0.79661524 11:0.83071075 12:0.77321066 13:0.82560879 14:0.69592947 15:0.82552996 16:0.6456272 17:0.8269035 18:0.60487331 19:0.84182186 20:0.76319996 21:0.83450451 22:0.68922085 23:0.83371431 24:0.63515383 25:0.83322507 26:0.58718106 27:0.85353824 28:0.76363576 29:0.84727946 30:0.69703985 31:0.84434588 32:0.64885033 33:0.84283378 34:0.60888968 35:0.86524699 36:0.7732397 37:0.86081803 38:0.71864707 39:0.85274409 40:0.67890009 41:0.84626403 42:0.64539876 
-6 1:0.81099662 2:0.59283056 3:0.78702224 4:0.55418395 5:0.78730914 6:0.47736787 7:0.80641191 8:0.41190288 9:0.81921235 10:0.35158001 11:0.75674043 12:0.41469698 13:0.75364685 14:0.31815033 15:0.75352632 16:0.25438532 17:0.75644048 18:0.19887858 19:0.78504272 20:0.41242827 21:0.7767376 22:0.31839288 23:0.77525422 24:0.2512565 25:0.77442993 26:0.19522767 27:0.81625516 28:0.42271481 29:0.8275482 30:0.36432132 31:0.82807422 32:0.3917052 33:0.82848817 34:0.41594218 35:0.84563124 36:0.43776798 37:0.85107966 38:0.40635919 39:0.84587326 40:0.42120284 41:0.84175153 42:0.43791304 
-6 1:0.15837252 2:0.65160443 3:0.095664808 4:0.63182953 5:0.056414868 6:0.56293451 7:0.039800347 8:0.50529655 9:0.02425609 10:0.44879213 11:0.095917599 12:0.43137698 13:0.083291665 14:0.33245874 15:0.076030417 16:0.26204578 17:0.071843245 18:0.20426967 19:0.1362968 20:0.42720511 21:0.12775732 22:0.30732053 23:0.10813058 24:0.23474445 25:0.094196125 26:0.17791823 27:0.17020433 28:0.44315458 29:0.11212561 30:0.39363982 31:0.079518952 32:0.46106309 33:0.071600987 34:0.51669842 35:0.19374253 36:0.47513239 37:0.12985711 38:0.45727258 39:0.10857351 40:0.51071991 41:0.10777273 42:0.55975655 
2.211176685941866 1:0.18738752 2:0.85283341 3:0.13613074 4:0.84087889 5:0.095259647 6:0.7950777 7:0.076711258 8:0.76184199 9:0.081764419 10:0.73464584 11:0.13317349 12:0.6862562 13:0.12359194 14:0.61987161 15:0.11358478 16:0.56616233 17:0.10683762 18:0.52956585 19:0.17061884 20:0.68349243 21:0.16876516 22:0.60451489 23:0.15347319 24:0.55242472 25:0.14059461 26:0.52345546 27:0.20368087 28:0.69856772 29:0.16677059 30:0.65480156 31:0.13665233 32:0.68003415 33:0.11812464 34:0.71134313 35:0.23066373 36:0.72980364 37:0.17350986 38:0.72594238 39:0.14768416 40:0.76755329 41:0.13662024 42:0.81398112 
-6 1:0.52333142 2:0.75992854 3:0.46526439 4:0.74212749 5:0.4306719 6:0.6573639 7:0.42620964 8:0.58410605 9:0.42682815 10:0.52548501 11:0.45364598 12:0.54244209 13:0.44327677 14:0.44942151 15:0.43666966 16:0.3823461 17:0.43365091 18:0.32793595 19:0.49727906 20:0.53833577 21:0.49129502 22:0.42602525 23:0.47407823 24:0.36025735 25:0.46224879 26:0.30518537 27:0.53612219 28:0.55605201 29:0.50148229 30:0.48370535 31:0.47342549 32:0.54584055 33:0.46734639 34:0.59821474 35:0.56674288 36:0.58971005 37:0.51804266 38:0.55854392 39:0.49160567 40:0.60973784 41:0.48710445 42:0.65637502 
-6 1:0.093860283 2:0.59653204 3:0.1116862 4:0.55761618 5:0.11859035 6:0.49239633 7:0.097220567 8:0.43485415 9:0.071588807 10:0.38811691 11:0.14930398 12:0.44652091 13:0.15351232 14:0.36866266 15:0.15168224 16:0.3142417 17:0.14795353 18:0.27162637 19:0.1243645 20:0.45043093 21:0.12725802 22:0.37225578 23:0.12464372 24:0.31539125 25:0.12118154 26:0.26523676 27:0.09413522 28:0.46316222 29:0.083777882 30:0.39940609 31:0.070687023 32:0.35683601 33:0.058157066 34:0.32031888 35:0.061511472 36:0.48515614 37:0.048268654 38:0.43758858 39:0.040517154 40:0.40780205 41:0.031925192 42:0.38094242 
-3.554421636627608 1:0.7988754 2:0.59660106 3:0.86104901 4:0.56158695 5:0.89576728 6:0.49406491 7:0.90612453 8:0.43913755 9:0.90594011 10:0.38955952 11:0.83678358 12:0.38509909 13:0.84323114 14:0.28719337 15:0.8494681 16:0.22488028 17:0.85579723 18:0.16796392 19:0.80934525 20:0.38761351 21:0.83079776 22:0.29080922 23:0.84675245 24:0.22599339 25:0.85387699 26:0.17107617 27:0.79160382 28:0.41057679 29:0.87290136 30:0.38461381 31:0.88095236 32:0.43446495 33:0.86398427 34:0.45915839 35:0.7884388 36:0.44456336 37:0.86622038 38:0.44693005 39:0.86736284 40:0.48910088 41:0.84189411 42:0.5116208 
4.915096260200412 1:0.79079102 2:0.87730526 3:0.84434707 4:0.88026254 5:0.88975168 6:0.85823665 7:0.90297434 8:0.83117467 9:0.90719302 10:0.80016851 11:0.89001647 12:0.71419939 13:0.91137315 14:0.63040715 15:0.92668913 16:0.57220918 17:0.93981785 18:0.52472354 19:0.84607275 20:0.70171769 21:0.87212009 22:0.61740309 23:0.89343414 24:0.55679464 25:0.91228904 26:0.50594664 27:0.80716478 28:0.71399026 29:0.86118024 30:0.72109346 31:0.87167603 32:0.77056165 33:0.86911739 34:0.80471336 35:0.77980229 36:0.74297336 37:0.83711842 38:0.78888393 39:0.84580859 40:0.83563204 41:0.84113808 42:0.86543189 
-6 1:0.23415602 2:0.72598595 3:0.28809631 4:0.69470161 5:0.32594292 6:0.6176056 7:0.31551469 8:0.55588343 9:0.28148065 10:0.50575794 11:0.28739174 12:0.49231548 13:0.29557691 14:0.37341103 15:0.29906039 16:0.298891 17:0.30157119 18:0.2334718 19:0.243376 20:0.49511826 21:0.24997905 22:0.36590605 23:0.26754922 24:0.27726204 25:0.2790585 26:0.20340063 27:0.20594358 28:0.51884257 29:0.24615962 30:0.45847327 31:0.2718313 32:0.52150147 33:0.27637186 34:0.56559209 35:0.17953314 36:0.55741516 37:0.23092894 38:0.52201963 39:0.25364532 40:0.57154958 41:0.25284323 42:0.61510074 
-6 1:0.064046026 2:0.48818505 3:0.11903836 4:0.48128739 5:0.15973759 6:0.41957092 7:0.16866328 8:0.35656343 9:0.15636653 10:0.30526005 11:0.16093705 12:0.36645348 13:0.16295358 14:0.31521107 15:0.1482402 16:0.34214377 17:0.13344663 18:0.36864086 19:0.1282201 20:0.35050377 21:0.12672997 22:0.30642589 23:0.11339496 24:0.34232509 25:0.10944789 26:0.35540497 27:0.09536335 28:0.34135615 29:0.096388046 30:0.29498033 31:0.092179494 32:0.3289221 33:0.089262314 34:0.35455661 35:0.061572051 36:0.33542437 37:0.068557213 38:0.27973438 39:0.073200874 40:0.24496223 41:0.076880453 42:0.21238056 
-6 1:0.54394342 2:0.73304117 3:0.59265298 4:0.68590613 5:0.61218243 6:0.61317584 7:0.61567758 8:0.56167393 9:0.60893904 10:0.52660612 11:0.5745427 12:0.55456838 13:0.59679065 14:0.52797978 15:0.61251611 16:0.58137186 17:0.61503897 18:0.63472798 19:0.55557101 20:0.55785015 21:0.59195543 22:0.52785714 23:0.60225196 24:0.59882335 25:0.59713408 26:0.65404959 27:0.53290374 28:0.56237068 29:0.57434643 30:0.52837979 31:0.58588744 32:0.59048376 33:0.57925449 34:0.6435092 35:0.50967784 36:0.56723967 37:0.52360306 38:0.4930169 39:0.53923476 40:0.44953304 41:0.54789835 42:0.41246424 
-2.54376725176918 1:0.90945071 2:0.88023127 3:0.87039679 4:0.87206966 5:0.83661548 6:0.83670468 7:0.83955609 8:0.79710272 9:0.86521269 10:0.76812625 11:0.84690743 12:0.74581136 13:0.84416639 14:0.7113083 15:0.86002996 16:0.74435005 17:0.86778787 18:0.77708494 19:0.88315258 20:0.73220577 21:0.88571149 22:0.71364172 23:0.89865775 24:0.76687304 25:0.90062028 26:0.80815738 27:0.91529895 28:0.7270281 29:0.91872007 30:0.70385194 31:0.926596 32:0.75153131 33:0.9272234 34:0.79318785 35:0.94818323 36:0.72720621 37:0.94789536 38:0.65992841 39:0.94804915 40:0.61692167 41:0.94417351 42:0.58380486 
-4.133045471489518 1:0.89111987 2:0.49810189 3:0.84500922 4:0.48976651 5:0.8036754 6:0.43126986 7:0.79982449 8:0.37717788 9:0.82548209 10:0.33791459 11:0.82252421 12:0.34078991 13:0.83724728 14:0.32445771 15:0.85120685 16:0.38429855 17:0.85553156 18:0.43031303 19:0.85938536 20:0.32915835 21:0.87506126 22:0.32231469 23:0.88227094 24:0.39342887 25:0.88136562 26:0.44158257 27:0.89508428 28:0.32896506 29:0.90514888 30:0.31100591 31:0.91073024 32:0.37409875 33:0.91031438 34:0.42345284 35:0.92874683 36:0.3343368 37:0.92165358 38:0.26734359 39:0.91918137 40:0.22835255 41:0.91466552 42:0.19689695 
-3.619502267788138 1:0.1645252 2:0.57924865 3:0.085298038 4:0.54148922 5:0.036005755 6:0.46930521 7:0.014997251 8:0.41137155 9:0.020797383 10:0.37516123 11:0.073288186 12:0.3676266 13:0.035192475 14:0.35592939 15:0.034367745 16:0.42418155 17:0.043430717 18:0.48023086 19:0.10247691 20:0.36270093 21:0.05062705 22:0.35190299 23:0.052576046 24:0.43685187 25:0.068860212 26:0.50419203 27:0.13988029 28:0.35915922 29:0.085214563 30:0.34139992 31:0.083220612 32:0.42544731 33:0.099184583 34:0.49268384 35:0.18449467 36:0.35716917 37:0.17207151 38:0.25063883 39:0.16675701 40:0.18885633 41:0.16332385 42:0.14224441 
-6 1:0.18755363 2:0.74352061 3:0.22056044 4:0.73488801 5:0.25093663 6:0.72165718 7:0.26891311 8:0.7180511 9:0.29015014 10:0.72639083 11:0.21392694 12:0.63034236 13:0.20416362 14:0.56369694 15:0.19094367 16:0.525928 17:0.17687322 18:0.49857763 19:0.17061895 20:0.62007698 21:0.13937693 22:0.68655839 23:0.13430803 24:0.76252912 25:0.13993431 26:0.81815118 27:0.1355473 28:0.63992892 29:0.11081055 30:0.72440314 31:0.12162964 32:0.78842699 33:0.13944686 34:0.832515 35:0.10685982 36:0.66911838 37:0.092193751 38:0.72432773 39:0.097864462 40:0.77057028 41:0.10913356 42:0.80206122 
-6 1:0.59145009 2:0.79535411 3:0.50878447 4:0.77464371 5:0.45074357 6:0.71283725 7:0.4350407 8:0.65290025 9:0.43908477 10:0.60330939 11:0.46791889 12:0.59244999 13:0.43719315 14:0.53143724 15:0.42576913 16:0.53208187 17:0.42159167 18:0.54518179 19:0.5096147 20:0.57794259 21:0.47359638 22:0.57850536 23:0.48607555 24:0.66622678 25:0.50487339 26:0.73844622 27:0.55320999 28:0.5705977 29:0.51381339 30:0.56451227 31:0.5176551 32:0.64374176 33:0.52915757 34:0.70748479 35:0.6011468 36:0.56352797 37:0.57595174 38:0.4719888 39:0.55966338 40:0.41314026 41:0.54243487 42:0.36387744 
-2.140502325350008 1:0.25067217 2:0.87016803 3:0.1988923 4:0.83692861 5:0.18483052 6:0.77645134 7:0.19131367 8:0.72304408 9:0.1903348 10:0.67867152 11:0.21879826 12:0.73883188 13:0.22734722 14:0.65358731 15:0.23170419 16:0.5983292 17:0.2363247 18:0.55448517 19:0.24831961 20:0.73823609 21:0.25422505 22:0.65083565 23:0.25716842 24:0.58961735 25:0.25911895 26:0.5401446 27:0.27477759 28:0.74378516 29:0.27672164 30:0.66059937 31:0.27854018 32:0.60246137 33:0.27966641 34:0.55873432 35:0.29757579 36:0.75534349 37:0.29848638 38:0.68906976 39:0.29724676 40:0.64474964 41:0.29520192 42:0.60902133 
6 1:0.20527365 2:0.52176903 3:0.16493769 4:0.48827842 5:0.15250922 6:0.42554757 7:0.15627815 8:0.37243795 9:0.15810784 10:0.32833765 11:0.18270438 12:0.38949302 13:0.18915626 14:0.30339812 15:0.19368645 16:0.24654397 17:0.19681092 18:0.20251935 19:0.20706498 20:0.38690306 21:0.21277195 22:0.29489775 23:0.2162706 24:0.22927278 25:0.21755044 26:0.17630344 27:0.22910566 28:0.39094684 29:0.23647528 30:0.30424112 31:0.24091905 32:0.24359139 33:0.24291549 34:0.19596862 35:0.24732999 36:0.40085438 37:0.25630749 38:0.33463698 39:0.25982896 40:0.28913596 41:0.26051254 42:0.25204897 
-0.5690109009956943 1:0.83650706 2:0.60658035 3:0.85480008 4:0.56831937 5:0.87032767 6:0.49763249 7:0.87023543 8:0.4405498 9:0.86173789 10:0.40042847 11:0.88702522 12:0.47448664 13:0.89138709 14:0.39294278 15:0.89358703 16:0.33418452 17:0.89384702 18:0.28967464 19:0.87282542 20:0.47324925 21:0.87579416 22:0.38666792 23:0.87479121 24:0.32481581 25:0.87311974 26:0.27597057 27:0.84693148 28:0.477894 29:0.84894661 30:0.39613453 31:0.84345891 32:0.33921532 33:0.8373824 34:0.29667462 35:0.80962434 36:0.48816381 37:0.8015356 38:0.42926328 39:0.79758874 40:0.38657013 41:0.79276822 42:0.35112273 
4.499845727313994 1:0.7998448 2:0.79175573 3:0.73088789 4:0.75806679 5:0.71509305 6:0.68251577 7:0.73317581 8:0.61569264 9:0.74891663 10:0.5644905 11:0.7770465 12:0.62836811 13:0.79191979 14:0.53015232 15:0.79885654 16:0.46502826 17:0.80603927 18:0.41420419 19:0.8191602 20:0.6290287 21:0.83106331 22:0.52788973 23:0.83735827 24:0.45403619 25:0.84266532 26:0.3968022 27:0.85043583 28:0.63914575 29:0.85773993 30:0.54366107 31:0.86052301 32:0.47422559 33:0.86349787 34:0.42489893 35:0.87285906 36:0.65677772 37:0.8776036 38:0.58020285 39:0.87659052 40:0.52723642 41:0.87514644 42:0.48681025 
6 1:0.51366275 2:0.81400985 3:0.45312709 4:0.77018892 5:0.43261456 6:0.69594508 7:0.43320467 8:0.63668652 9:0.42995576 10:0.60032345 11:0.46914393 12:0.64080537 13:0.48543282 14:0.54689484 15:0.49143792 16:0.4901071 17:0.49559159 18:0.45161529 19:0.50874938 20:0.63716665 21:0.52575753 22:0.53222296 23:0.53095465 24:0.46351644 25:0.53306923 26:0.41048498 27:0.54870701 28:0.64344269 29:0.55981669 30:0.54666977 31:0.56821246 32:0.48479687 33:0.5724847 34:0.438321 35:0.58563482 36:0.65827424 37:0.5964766 38:0.58346003 39:0.60285449 40:0.53772045 41:0.60589455 42:0.50073759 
6 1:0.84765993 2:0.75109997 3:0.88352767 4:0.72118103 5:0.90016083 6:0.67306016 7:0.90932747 8:0.63508986 9:0.92266265 10:0.6066619 11:0.8678049 12:0.63948113 13:0.86284288 14:0.58485896 15:0.86078047 16:0.54979488 17:0.85967361 18:0.52321986 19:0.84836765 20:0.63887237 21:0.84033137 22:0.57866461 23:0.8361285 24:0.53843347 25:0.83430549 26:0.50662641 27:0.8276943 28:0.64370347 29:0.82140951 30:0.58662874 31:0.81740244 32:0.54696269 33:0.81656373 34:0.51656964 35:0.80811495 36:0.65305497 37:0.80343809 38:0.60647222 39:0.8020809 40:0.57580828 41:0.80352516 42:0.55141108 
2.927270541324599 1:0.87936487 2:0.56705083 3:0.91435793 4:0.52739401 5:0.93202377 6:0.4708016 7:0.94100007 8:0.42665393 9:0.95687139 10:0.3954311 11:0.89941378 12:0.45573632 13:0.89331927 14:0.40061509 15:0.89289573 16:0.36198348 17:0.89295797 18:0.33205263 19:0.87952734 20:0.45693754 21:0.87195926 22:0.40012568 23:0.87090594 24:0.35689149 25:0.8714428 26:0.32225174 27:0.85937959 28:0.46134015 29:0.85394446 30:0.40756564 31:0.85401063 32:0.36476341 33:0.85682603 34:0.33315771 35:0.84100913 36:0.46752716 37:0.83802591 38:0.42546475 39:0.83815611 40:0.39065011 41:0.83954366 42:0.3612814 
6 1:0.18506666 2:0.77609944 3:0.26000987 4:0.74412532 5:0.301881 6:0.67289937 7:0.31760376 8:0.60526699 9:0.33716156 10:0.54724914 11:0.2217201 12:0.58786606 13:0.20893074 14:0.47649092 15:0.20139769 16:0.40473286 17:0.19264501 18:0.34932448 19:0.17712628 20:0.59088201 21:0.1692182 22:0.47388394 23:0.16597183 24:0.3913336 25:0.15981794 26:0.32387256 27:0.13948981 28:0.6043696 29:0.13535178 30:0.49557945 31:0.13241259 32:0.41818307 33:0.12974618 34:0.35870366 35:0.10711257 36:0.62699454 37:0.10308244 38:0.5394981 39:0.10117922 40:0.48386479 41:0.1002043 42:0.44008147 
4.191476140413864 1:0.42818173 2:0.71954859 3:0.47605143 4:0.67257401 5:0.50148703 6:0.59751994 7:0.51373689 8:0.53694019 9:0.5275142 10:0.48827484 11:0.45375854 12:0.54858695 13:0.4296944 14:0.45368656 15:0.4169685 16:0.39332631 17:0.40811852 18:0.34693909 19:0.42146151 20:0.555348 21:0.39622455 22:0.4520402 23:0.38208387 24:0.38127646 25:0.37140293 26:0.32393484 27:0.38560668 28:0.57243759 29:0.3657614 30:0.47395935 31:0.35408341 32:0.40579452 33:0.34827445 34:0.35344952 35:0.34964674 36:0.59701693 37:0.33157741 38:0.51754433 39:0.32548189 40:0.46496407 41:0.32314402 42:0.42133059 
-0.2924396294652686 1:0.15934634 2:0.97463533 3:0.21839347 4:0.96189603 5:0.2710055 6:0.90126563 7:0.30386042 8:0.85136152 9:0.33566727 10:0.80925262 11:0.22662337 12:0.78954951 13:0.23488514 14:0.68393115 15:0.23609387 16:0.62207757 17:0.23821023 18:0.57066607 19:0.18287638 20:0.78943601 21:0.17768084 22:0.7941269 23:0.17816891 24:0.87660995 25:0.18052858 26:0.93625379 27:0.14565861 28:0.8006172 29:0.13957303 30:0.80107951 31:0.14801617 32:0.86253739 33:0.15747456 34:0.90781992 35:0.116058 36:0.81216318 37:0.11545203 38:0.74654277 39:0.1117542 40:0.70229779 41:0.10834842 42:0.65952663 
6 1:0.20026941 2:0.53798899 3:0.26611566 4:0.54172061 5:0.32564475 6:0.49243131 7:0.35935591 8:0.43454434 9:0.39416264 10:0.39514791 11:0.29139001 12:0.37952815 13:0.2996872 14:0.28943873 15:0.30070487 16:0.22995538 17:0.30271434 18:0.18444118 19:0.24626152 20:0.36765713 21:0.22381176 22:0.30002237 23:0.21445046 24:0.37278147 25:0.22075986 26:0.42729201 27:0.2074954 28:0.36400862 29:0.18553674 30:0.31134162 31:0.18339462 32:0.37356134 33:0.19228486 34:0.42296733 35:0.17168865 36:0.36859424 37:0.17895266 38:0.28514139 39:0.18622046 40:0.23574264 41:0.19520651 42:0.19406698 
-1.28968224349344 1:0.70879271 2:0.8270571 3:0.77296913 4:0.82056927 5:0.82132157 6:0.76233824 7:0.85056908 8:0.72019821 9:0.87393125 10:0.69091586 11:0.75829927 12:0.63727616 13:0.75945205 14:0.53301032 15:0.77240242 16:0.47150687 17:0.78294696 18:0.42554099 19:0.72829063 20:0.64096452 21:0.77845459 22:0.61101254 23:0.78808473 24:0.690324 25:0.77553503 26:0.74574163 27:0.70185304 28:0.65339424 29:0.75512633 30:0.63628008 31:0.76644988 32:0.70849492 33:0.76157911 34:0.75846467 35:0.67748901 36:0.66927892 37:0.69260519 38:0.58304409 39:0.7125444 40:0.5300374 41:0.72846871 42:0.47988053 
6 1:0.56535311 2:0.70787655 3:0.63114253 4:0.67430286 5:0.66671605 6:0.60177238 7:0.6867758 8:0.55485923 9:0.69944283 10:0.51487892 11:0.59883048 12:0.48593563 13:0.59349984 14:0.39286492 15:0.59829034 16:0.33551228 17:0.6028086 18:0.29158787 19:0.56497288 20:0.49645323 21:0.60413579 22:0.46100082 23:0.61931063 24:0.53244367 25:0.61742678 26:0.58739433 27:0.53747835 28:0.51235615 29:0.58417913 30:0.48561173 31:0.6012823 32:0.55371763 33:0.60152071 34:0.60478133 35:0.51399163 36:0.53103296 37:0.52035103 38:0.45050659 39:0.53443627 40:0.40355015 41:0.54508942 42:0.35906361 
-3.447583391803078 1:0.87169246 2:0.87724337 3:0.81772436 4:0.87514592 5:0.76680705 6:0.82206306 7:0.74048529 8:0.77459263 9:0.71227254 10:0.74310812 11:0.81610461 12:0.71520806 13:0.81473022 14:0.6355672 15:0.81798267 16:0.57958654 17:0.82121269 18:0.53269605 19:0.85068522 20:0.70346324 21:0.86689869 22:0.69672657 23:0.8741165 24:0.77574391 25:0.87232009 26:0.82484016 27:0.88445922 28:0.70248025 29:0.8942367 30:0.68798293 31:0.89984873 32:0.75135464 33:0.90010181 34:0.79498277 35:0.91719316 36:0.70584633 37:0.9022622 38:0.62969859 39:0.8947303 40:0.58063094 41:0.88625922 42:0.5351706 
6 1:0.88026226 2:0.55490817 3:0.82859509 4:0.5541253 5:0.77998974 6:0.50586843 7:0.75303381 8:0.45765317 9:0.72579721 10:0.43125793 11:0.8165453 12:0.41589998 13:0.80652329 14:0.34905297 15:0.80372473 16:0.30109389 17:0.80154622 18:0.26049747 19:0.85165471 20:0.40104952 21:0.8725278 22:0.36017713 23:0.88547607 24:0.42097904 25:0.88590297 26:0.46114315 27:0.88664827 28:0.39498495 29:0.90017022 30:0.35569294 31:0.90720802 32:0.40742303 33:0.90693638 34:0.44813402 35:0.91921721 36:0.39589353 37:0.91008341 38:0.32563212 39:0.90571705 40:0.28524443 41:0.89935807 42:0.25136667 
6 1:0.30925023 2:0.53905647 3:0.23349516 4:0.53213553 5:0.18082462 6:0.46985731 7:0.15122464 8:0.42471045 9:0.13556695 10:0.39102817 11:0.23451528 12:0.32839733 13:0.22657932 14:0.21892779 15:0.21552639 16:0.14811501 17:0.20964188 18:0.0899213 19:0.26407784 20:0.32393509 21:0.22322439 22:0.22478262 23:0.19375373 24:0.1729643 25:0.17517528 26:0.12942304 27:0.29652151 28:0.32886821 29:0.25926887 30:0.28484333 31:0.24872453 32:0.36442283 33:0.24977913 34:0.42448801 35:0.33416361 36:0.33311926 37:0.32525637 38:0.23155565 39:0.31506546 40:0.172367 41:0.3050663 42:0.11598149 
6 1:0.31200088 2:0.85267519 3:0.24473364 4:0.84328588 5:0.19309625 6:0.78130859 7:0.16350898 8:0.74129644 9:0.14485059 10:0.70572826 11:0.24679962 12:0.6551481 13:0.24367458 14:0.55159698 15:0.23682599 16:0.48762115 17:0.23386499 18:0.435824 19:0.28063525 20:0.65359701 21:0.23326324 22:0.58047846 23:0.20590854 24:0.54582407 25:0.19111318 26:0.51926475 27:0.31489731 28:0.66229925 29:0.26864638 30:0.64787612 31:0.25610057 32:0.72740967 33:0.25874481 34:0.78772099 35:0.35117422 36:0.67277321 37:0.34174363 38:0.59465985 39:0.34141066 40:0.54489664 41:0.34210287 42:0.49656515 
6 1:0.52783407 2:0.77195251 3:0.4492617 4:0.76872321 5:0.37501943 6:0.69213331 7:0.34029147 8:0.62824327 9:0.317787 10:0.58025363 11:0.40797466 12:0.55254832 13:0.4027575 14:0.45392751 15:0.38982712 16:0.38440794 17:0.38017126 18:0.32148963 19:0.45538831 20:0.53777002 21:0.42805664 22:0.43891763 23:0.3956471 24:0.38379762 25:0.37014916 26:0.33861002 27:0.50381604 28:0.5376096 29:0.47923474 30:0.49509148 31:0.47726645 32:0.59249866 33:0.48018296 34:0.67107429 35:0.55637959 36:0.53880182 37:0.5401571 38:0.43907882 39:0.53145241 40:0.38422064 41:0.51779944 42:0.33486179
`

browser.runtime.onInstalled.addListener(async () => {
  await initializeStorageWithDefaults({
    handMouseModel
  });

  console.log('HandMouse instalado com sucesso');
});

// chrome.runtime.onMessage.addListener(async (message, _, sendResponse) => {
//   switch (message.from) {
//     case 'popup':
//       console.log(message);
//       break;
//     case 'content':
//       if (message.content.requestStorage) {
//         const storage = await getStorageItem(message.content.requestStorage);
//         sendResponse(storage);
//       }
//       break;
//     case 'app':
//       break
//     default:
//       throw new Error('Message from not found');
//   }

//   return true
// })
