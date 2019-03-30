import '../scss/global.scss';
import {parseDays} from "./jsonParser";
import {draw} from "./print";

parseDays().then(days => {
    draw(days);
}).catch(err => {
    draw(null);
});

