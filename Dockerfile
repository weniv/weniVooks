FROM node:18-alpine

WORKDIR /app

# 의존성 파일 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 환경변수 설정
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 빌드
RUN npm run build

# 포트 노출
EXPOSE 3000

# 사용자 생성
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app

USER nextjs

# 일반 Next.js start 명령어 사용
CMD ["npm", "start"]