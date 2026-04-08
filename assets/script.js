document.addEventListener("DOMContentLoaded", function(){
  let currentLang = 'en';

  function render(c){
    document.getElementById("name").textContent = c.name;
    document.getElementById("email").textContent = c.email;
    document.getElementById("email").href = "mailto:" + c.email;
    document.getElementById("github").textContent = c.github.replace(/^https?:\/\//,'');
    document.getElementById("github").href = c.github;

    document.getElementById("section_intro_title").textContent = currentLang==="zh"?"个人简介":"Profile";
    document.getElementById("section_intro").textContent = c.intro;

    document.getElementById("section_edu_title").textContent = currentLang==="zh"?"教育背景":"Education";
    document.getElementById("section_edu").innerHTML = c.education.map(e=>{
        return `<li>
            <div><strong>${e.school}</strong></div>
            <div style="display:flex; justify-content:space-between;">
            <span>${e.degree}</span>
            <span style="font-style:italic;">${e.time || ''}</span>
            </div>
            ${e.label ? `<div>${e.label.replace(/\n/g,'<br>')}</div>` : ''}
        </li>`;
    }).join("");

    document.getElementById("section_work_title").textContent = currentLang==="zh"?"工作经历":"Work Experience";
    document.getElementById("section_work").innerHTML = c.work.map(w=>{
        let projectHtml = '';

        if (w.projects) {
            projectHtml = w.projects.map(p => {
            return `
                <div style="margin-top:6px;">
                <div><strong>${p.name}</strong></div>
                <ul>
                    ${p.desc.map(d=>`<li>${d}</li>`).join('')}
                </ul>
                </div>
            `;
            }).join('');
        } else {
            // 兼容旧数据（没有 projects）
            projectHtml = `<ul>${w.desc.map(d=>`<li>${d}</li>`).join('')}</ul>`;
        }

        return `<li>
            <div><strong>${w.company}</strong></div>
            <div style="display:flex; justify-content:space-between;">
            <span>${w.position}</span>
            <span style="font-style:italic;">${w.time}</span>
            </div>
            ${projectHtml}
        </li>`;
    }).join("");

    document.getElementById("section_intern_title").textContent = currentLang==="zh"?"实习经历":"Internship";
    document.getElementById("section_intern").innerHTML = c.intern.map(i=>{
      const descHtml = i.desc.length ? `<ul>${i.desc.map(d=>`<li>${d}</li>`).join('')}</ul>` : '';
      return `<li>
        <div><strong>${i.company}</strong></div>
        <div style="display:flex; justify-content:space-between;">
          <span>${i.position || ''}</span>
          <span style="font-style:italic;">${i.time}</span>
        </div>
        ${descHtml}
      </li>`;
    }).join("");

    document.getElementById("section_skill_title").textContent = currentLang==="zh"?"个人技能":"Skills";
    document.getElementById("section_skill").innerHTML = c.skills.map(s=>`<li>${s}</li>`).join('');
  }

  fetch('data/resume.json')
    .then(res => res.json())
    .then(data => render(data[currentLang]))
    .catch(err => console.error("加载 JSON 失败", err));

  window.setLanguage = function(lang){
    currentLang = lang;
    localStorage.setItem('lang', lang);
    fetch('data/resume.json')
      .then(res => res.json())
      .then(data => render(data[currentLang]))
      .catch(err => console.error("加载 JSON 失败", err));
  }
});