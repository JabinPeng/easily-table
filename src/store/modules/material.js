const material = {
    state: {
        defMaterials : [
            {
              name: 'general',
              label: 'General',
              lang: 'L10301',
              icon: '',
              enable: true,
              children: [
                {
                  type: 'rectangle',
                  label: 'Rectangle',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 40,
                  minWidth: 20,
                  minHeight: 20,
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
                },
                {
                  type: 'rounded-rectangle',
                  label: 'Rounded Rectangle',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 40,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" rx="2.16" ry="2.16" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
                },
                {
                  type: 'text',
                  label: 'Text',
                  defaultLabel: 'Text',
                  enable: true,
                  width: 80,
                  height: 40,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="0.73" y="7.3" width="29.2" height="14.6" fill="none" stroke="white" pointer-events="stroke" visibility="hidden" stroke-width="9"></rect><rect x="0.73" y="7.3" width="29.2" height="14.6" fill="none" stroke="none" pointer-events="all"></rect></g><g style=""><g transform="translate(7,10)scale(0.73)"><foreignObject style="overflow:visible;" pointer-events="all" width="22" height="12"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; width: 24px; white-space: normal; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;white-space:normal;">Text</div></div></foreignObject></g></g></g><g></g><g></g></g>`
                },
                {
                  type: 'textbox',
                  label: 'Textbox',
                  defaultLabel: '',
                  enable: false,
                  width: 80,
                  height: 80,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.65" y="6.6" width="28.5" height="18" fill="none" stroke="white" pointer-events="stroke" visibility="hidden" stroke-width="9"></rect><rect x="1.65" y="6.6" width="28.5" height="18" fill="none" stroke="none" pointer-events="all"></rect></g><g style=""><g transform="translate(2,5)scale(0.15)"><foreignObject style="overflow:visible;" pointer-events="all" width="180" height="126"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; overflow: hidden; max-height: 130px; max-width: 180px; width: 181px; white-space: normal; overflow-wrap: normal; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;white-space:normal;"><h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div></div></foreignObject></g></g></g><g></g><g></g></g>`
                },
                {
                  type: 'ellipse',
                  label: 'Ellipse',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 40,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.84" cy="14.88" rx="14.399999999999999" ry="9.6" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>`
                },
                {
                  type: 'square',
                  label: 'Square',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 80,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2.38" y="1.36" width="27.2" height="27.2" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
                },
                {
                  type: 'circle',
                  label: 'Circle',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 80,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.98" cy="14.96" rx="13.600000000000001" ry="13.600000000000001" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>`
                },
                {
                  type: 'process',
                  label: 'Process',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 40,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
                },
                {
                  type: 'diamond',
                  label: 'Diamond',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 80,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 15.98 1.36 L 29.58 14.96 L 15.98 28.56 L 2.38 14.96 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
                },
                {
                  type: 'parallelogram',
                  label: 'Parallelogram',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 40,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 22.08 L 7.2 7.68 L 30.24 7.68 L 24.48 22.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
                },
                {
                  type: 'hexagon',
                  label: 'Hexagon',
                  defaultLabel: '',
                  enable: true,
                  width: 80,
                  height: 40,
                  minWidth: 20,
                  minHeight: 20,
                  
                  
                  icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.64 5.28 L 23.04 5.28 L 30.24 14.88 L 23.04 24.48 L 8.64 24.48 L 1.44 14.88 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
                }
              ]
            }
          ]
    },
    actions: {},
    mutations: {
    }
};

export default material;
