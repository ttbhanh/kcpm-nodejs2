# Sử dụng hình ảnh chứa Node.js
FROM node:latest

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Expose cổng mà ứng dụng lắng nghe
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["node" , "index.js"]

