import { createStore } from "vuex";

export const START_GAME = "START_GAME";
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";
export const INCREMENT_TIMER = "INCREMENT_TIMER";

export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 일반 칸
  QUESTION: -2, // 물음표
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 물음표 칸이 지뢰인 경우
  FLAG_MINE: -5, // 깃발 칸이 지뢰인 경우
  CLICKED_MINE: -6, // 지뢰 클릭
  OPENED: 0, // 칸 열었을 때 (0이상이면 다 opened)
};

const plantMine = (row, col, mine) => {
  const candidate = Array(row * col)
    .fill()
    .map((arr, i) => {
      //0 ~ 99까지
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1
    )[0];
    shuffle.push(chosen); // 랜덤으로 뽑은 20개 숫자들을 shuffle 배열에 넣기
  }
  //2차원 배열 만들기
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.NORMAL); // 일반칸을 기본으로 설정
    }
  }
  //2차원 배열에 지뢰 심기
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / col);
    const hor = shuffle[k] % col;
    data[ver][hor] = CODE.MINE; // 지뢰 심기
  }
  return data;
};

export default createStore({
  state: {
    tableData: [],
    data: {
      row: 0,
      col: 0,
      mine: 0,
    },
    timer: 0,
    halted: true,
    result: "",
    openedCount: 0,
  },
  getters: {},
  mutations: {
    [START_GAME](state, { row, col, mine }) {
      state.data = {
        row,
        col,
        mine,
      };
      state.tableData = plantMine(row, col, mine);
      state.timer = 0;
      state.halted = false;
      state.openedCount = 0;
      state.result = "";
    },
    [OPEN_CELL](state, { row, col }) {
      let openedCount = 0;
      const checked = [];
      function checkAround(row, col) {
        const checkRowOrColIsUndefined =
          row < 0 ||
          row >= state.tableData.length ||
          col < 0 ||
          col >= state.tableData[0].length;
        if (checkRowOrColIsUndefined) return;
        if (
          [
            CODE.OPENED,
            CODE.FLAG,
            CODE.FLAG_MINE,
            CODE.QUESTION_MINE,
            CODE.QUESTION,
          ].includes(state.tableData[row][col])
        )
          return;
        if (checked.includes(row + "/" + col)) {
          return;
        } else {
          checked.push(row + "/" + col);
        }
        let around = [];
        if (state.tableData[row - 1]) {
          around = around.concat([
            state.tableData[row - 1][col - 1],
            state.tableData[row - 1][col],
            state.tableData[row - 1][col + 1],
          ]);
        }
        around = around.concat([
          state.tableData[row][col - 1],
          state.tableData[row][col + 1],
        ]);
        if (state.tableData[row + 1]) {
          around = around.concat([
            state.tableData[row + 1][col - 1],
            state.tableData[row + 1][col],
            state.tableData[row + 1][col + 1],
          ]);
        }

        const counted = around.filter(function (v) {
          if (v === undefined) return false;
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MIEN].includes(v);
        });
        if (counted.length === 0) {
          // 주변칸에 지뢰가 하나도 없다면
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, col - 1]);
            near.push([row - 1, col]);
            near.push([row - 1, col + 1]);
          }
          near.push([row, col - 1]);
          near.push([row, col + 1]);
          if (row + 1 < state.tableData.length) {
            near.push([row + 1, col - 1]);
            near.push([row + 1, col]);
            near.push([row + 1, col + 1]);
          }
          near.forEach((n) => {
            if (state.tableData[n[0]][n[1]] !== CODE.OPENED)
              checkAround(n[0], n[1]);
          });
        }
        if (state.tableData[row][col] === CODE.NORMAL) {
          openedCount += 1;
        }
        state.tableData[row].splice(col, 1, counted.length);
      }
      checkAround(row, col);
      let halted = false;
      let result = "";
      if (
        state.data.row * state.data.col - state.data.mine ===
        state.openedCount + openedCount
      ) {
        halted = true;
        result = `${state.timer}초만에 승리하였습니다.`;
      }
      state.openedCount += openedCount;
      state.halted = halted;
      state.result = result;
      // state.tableData[row][col] = CODE.OPENED;
    },
    [CLICK_MINE](state, { row, col }) {
      state.halted = true;
      state.tableData[row].splice(col, 1, CODE.CLICKED_MINE);
    },
    [FLAG_CELL](state, { row, col }) {
      if (state.tableData[row][col] === CODE.MINE) {
        state.tableData[row].splice(col, 1, CODE.FLAG_MINE);
      } else {
        state.tableData[row].splice(col, 1, CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, { row, col }) {
      if (state.tableData[row][col] === CODE.FLAG_MINE) {
        state.tableData[row].splice(col, 1, CODE.QUESTION_MINE);
      } else {
        state.tableData[row].splice(col, 1, CODE.QUESTION);
      }
    },
    [NORMALIZE_CELL](state, { row, col }) {
      if (state.tableData[row][col] === CODE.QUESTION_MINE) {
        state.tableData[row].splice(col, 1, CODE.MINE);
      } else {
        state.tableData[row].splice(col, 1, CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer++;
    },
  },
});
