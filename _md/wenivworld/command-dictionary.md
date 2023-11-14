---
title: 부록-명령어 사전
date: 2023-11-10
---

## **함수 리스트**

- **mission_start()** : 임무 시작
- **mission_end()** : 임무 끝
- **print()** : 터미널에 결과물 출력
- **say()** : 캐릭터 말풍선에 출력
- **item()** : 캐릭터가 가진 아이템 반환
- **on_item()** : 캐릭터 아래 아이템 여부 반환
- **directions()** : 캐릭터의 방향을 반환
- **move()** : 캐릭터가 바라보는 방향으로 한 칸 이동
- **turn_left()** : 왼쪽(반 시계 방향)으로 회전
- **pick()** : 캐릭터 위치에 아이템이 있으면 해당 아이템 획득
- **put(`item`)** : 캐릭터가 입력한 아이템(`item`)을 가지고 있다면, 자신의 발 아래의 아이템을 추가
- **repeat(`count`, `function`)** : 함수(`function`)을 `count` 횟수 만큼 반복
- **open_door()** : 캐릭터의 이동 방향에 벽(`door`)이 있는 경우 벽을 삭제
- **set_item(`x`, `y`, `item`, `count`)** : 맵 `x,y` 좌표에 `item`을 `count` 숫자 만큼 생성
  - `item` 종류
    - fish-1
    - fish-2
    - fish-3
    - diamond
    - apple
    - goldbar
- **[ `front` | `left` | `right` | `back` ]\_is_clear()** : 캐릭터의 [ `앞` | `좌` | `우` | `뒤` ]에 벽이 있는지 판단
- **typeof_wall()** : 캐릭터의 이동 방향의 벽 타입을 반환
- **turn_right()** : (from modules import turn_right), 오른쪽으로 회전
- t**urn_around()** : (from modules import turn_around), 뒤로 회전
- **move_to_wall()** : (from modules import move_to_wall), 장애물 한 칸을 뛰어넘음
- **turn_left_until_clear()** : (from modules import turn_left_until_clear), 왼쪽이 비어있을 때까지 회전
- **jump()** : (from modules import jump), 장애물 한 칸을 뛰어넘음

---

## 변수 리스트

- **character_data :** 캐릭터 데이터
- **map_data :** 지도 데이터
- **item_data** : 아이템 데이터
- **wall_data['world']** : 맵 데이터
