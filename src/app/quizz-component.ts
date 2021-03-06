import { domService } from '@app/core/services/dom.service';
import {
  IQuizzComponent,
  IQuizz,
  IQuizzItem,
  IQuizzConfig,
  IQuizzDom,
  IScoreInfos
} from '@models/quizz.model';

// create dom containers for quizz
export const quizzDom: IQuizzDom = {
  body: document.body as HTMLBodyElement,
  container: domService.createContainer(),
  title: domService.createTitle('Choose a Quizz...'),
  rowTitle: domService.createRow(),
  rowQ: domService.createRow(),
  rowA: domService.createRow(),
  nav: domService.createNav(),
  score: domService.createRow(),
  choiceBtns: []
};

export const quizzComponent: IQuizzComponent = {
  create() {
    quizzDom.container.appendChild(quizzDom.nav);
    quizzDom.rowTitle.appendChild(quizzDom.title);
    quizzDom.container.appendChild(quizzDom.rowTitle);
    quizzDom.container.appendChild(quizzDom.rowQ);
    quizzDom.container.appendChild(quizzDom.rowA);
    quizzDom.container.appendChild(quizzDom.score);
    quizzDom.body.appendChild(quizzDom.container);
  },
  displayGameOver: ({ currentScore, questionsNbr }: IScoreInfos) => {
    console.log('displayGameover', currentScore, questionsNbr);
  },
  refreshScore: ({ currentScore, questionsNbr }: IScoreInfos) => {
    quizzDom.score.innerHTML = `Score: ${currentScore} / ${questionsNbr}`;
  },

  toggleBtns(btn: HTMLButtonElement, isExact: boolean) {
    quizzDom.choiceBtns.forEach(
      (btn: HTMLButtonElement) => (btn.disabled = true)
    );
    btn.classList.add(isExact ? 'btn-success' : 'btn-danger');
  },

  fillQuizz(quizz: IQuizz) {
    quizzDom.title.innerText = 'Current quizz: ' + quizz.name['fr'];
  },

  fillAnswers(items: IQuizzItem[]) {
    // clean previous answer buttons
    domService.emptyBlock(quizzDom.rowA);
    items.forEach(item => {
      const btnAnswer = domService.createButtonBlock(item.a['fr'], {
        id: item.id + ''
      });
      quizzDom.choiceBtns.push(btnAnswer);
      const col = domService.createCol(6, { xl: 3 });
      col.classList.add('p-1');
      col.appendChild(btnAnswer);
      quizzDom.rowA.appendChild(col);
    });
  },

  fillItem(item: IQuizzItem) {
    quizzDom.rowQ.innerText = item.q['fr'];
  },

  createNavButtons([quizzes, config]: [IQuizz[], IQuizzConfig]) {
    quizzes.forEach(quizz => {
      if (quizz.items.length >= config.itemsNbr) {
        quizzDom.nav.appendChild(
          domService.createLink(
            quizz.name['fr'],
            { id: quizz.id + '' },
            { href: '/' + quizz.id }
          )
        );
      }
    });
  }
};
