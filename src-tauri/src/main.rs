#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![called_from_js])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn called_from_js() -> String {
    println!("Returning from tauri");
    "Hi from Tauri".to_string()
}
