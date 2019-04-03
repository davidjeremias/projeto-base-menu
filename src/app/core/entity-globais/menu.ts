export class MenuComponent {

    menu = [
        {
            "text": "Início",
            "heading": true,
            "icon": "glyphicon glyphicon-home",
            "url": "/home",
            "roles": ["uma_authorization"]
        },
        {
          "text": "Monitoramento",
          "icon": "glyphicon glyphicon-facetime-video",
          "url": "/monitorar-repasse",
          "roles": ["uma_authorization"]
        },
        {
            "text": "Convênios",
            "icon": "glyphicon glyphicon-duplicate",
            "url": "consulta-convenio",
            "submenu": [
                {   "text": "Cadastrar",
                    "icon": "glyphicon glyphicon-usd",
                    "url": "/cadastro-convenio"
                },
                {   "text": "Consultar",
                    "icon": "glyphicon glyphicon-usd",
                    "url": "/consulta-convenio"
                }
            ],
            "roles": ["uma_authorization"]
        }
      ];
    
    public getMenu() {
        return this.menu;
    }
}
