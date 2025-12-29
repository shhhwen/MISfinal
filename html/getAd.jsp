<%@ page import="java.io.File, java.util.*" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<%
    try {
        // 1. 定義圖片資料夾的實體路徑 (假設你的圖片放在專案根目錄下的 image 資料夾)
        String folderPath = application.getRealPath("/image");
        File folder = new File(folderPath);

        // 2. 取得資料夾內所有的檔案
        File[] listOfFiles = folder.listFiles();
        List<String> images = new ArrayList<String>();

        if (listOfFiles != null) {
            for (File file : listOfFiles) {
                if (file.isFile()) {
                    String name = file.getName().toLowerCase();
                    // 3. 只抓取常見的圖片格式
                    if (name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png") || name.endsWith(".gif")) {
                        images.add(file.getName());
                    }
                }
            }
        }

        if (!images.isEmpty()) {
            // 4. 隨機挑選一張圖片
            Random ran = new Random();
            String randomImage = images.get(ran.nextInt(images.size()));
            
            // 5. 組合輸出路徑 (假設網址存取路徑為 ../image/檔名)
            String imgPath = "../image/" + randomImage;
%>
    <img src="<%=imgPath%>" alt="隨機廣告" style="width:100%; height:100%; object-fit:cover;">
<%
        } else {
            out.print("image 資料夾內無圖片資料");
        }
    } catch (Exception e) {
        out.print("錯誤：" + e.toString());
    }
%>